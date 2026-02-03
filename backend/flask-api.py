from flask import Flask, request, jsonify, session
import mysql.connector
from mysql.connector import Error
import bcrypt
from datetime import timedelta
from flask_cors import CORS
from functools import wraps
import os
from dotenv import load_dotenv
from collections import defaultdict

# Load environment variables from .env file
load_dotenv()

# Set up flask app
app = Flask(__name__)
app.secret_key = os.getenv('BACKEND_KEY')
app.permanent_session_lifetime = timedelta(days=7)

app.config.update(
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=False,  # HTTPS only in prod
)

CORS(
    app,
    supports_credentials=True,
    methods=["GET", "POST", "PATCH", "PUT", "OPTIONS"],
    allow_headers=["Content-Type"]
)

# DB setup
db_config = {
    'host': os.getenv('DATABASE_HOST'),
    'database': os.getenv('DATABASE_NAME'),
    'user': os.getenv('DATABASE_USER'),
    'password': os.getenv('DATABASE_PASSWORD')
}

# gets connection to db
def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        return None

def loginRequired(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        print(session)
        if 'email' not in session:
            return jsonify({'error':'Not authenticated or not logged in'}), 401
        return f(*args, **kwargs)
    return wrapper

# authenticates user
@app.route('/auth', methods=['POST'])
def authenticate():
    # gets data from json
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # connects to database
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success': False, 'error': 'Database connection failed'}), 500

    try:
        # gets user info
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT userID, firstName, lastName, email, gradYear, passwordHash, teamID
            FROM users
            WHERE TRIM(LOWER(email)) = TRIM(LOWER(%s))
            """,
            (email,)
        )
        user_record = cursor.fetchone()

        # if fail return
        if not user_record:
            return jsonify({'success': False, 'error': 'Invalid: email not found'}), 401

        # Compare bcrypt hash with provided password
        if bcrypt.checkpw(password.encode("utf-8"), user_record["passwordHash"].encode("utf-8")):
            # If match make session and add user
            session.permanent = True
            session['id'] = user_record.get('userID')
            session['firstName'] = user_record.get('firstName')
            session['email'] = email
            session['lastName'] = user_record.get('lastName')
            session['gradYear'] = user_record.get('gradYear')
            session['teamID'] = user_record.get('teamID')

            return jsonify({
                'success':True,
                'user': {
                    'id': user_record['userID'],
                    'firstName': user_record['firstName'],
                    'lastName': user_record['lastName'],
                    'email': email,
                    'gradYear': user_record['gradYear'],
                    'teamID': user_record['teamID']
                }
            }), 200

        else:
            return jsonify({'success':False, 'error': "Invalid email or password"}), 401

    except Error as e:
        return jsonify({'success':False, 'error': "Backend error"}), 500

    finally:
        cursor.close()
        conn.close()

# logs out current user
@app.route('/logout', methods=['POST'])
@loginRequired
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out'}), 200

# returns current user
@app.route('/currentUser', methods=['GET'])
@loginRequired
def currentUser():
    if 'email' in session:
        # If email exists in the session return user info
        return jsonify({
            'id':session.get('id'),
            'firstName':session.get('firstName'),
            'lastName':session.get('lastName'),
            'email': session.get('email'),
            'gradYear': session.get('gradYear'),
            'teamID' : session.get('teamID')
        }), 200
    else:
        # else return none
        return jsonify({
            'id':None,
            'firstName':None,
            'lastName':None,
            'email': None,
            'gradYear': None
        }), 401

# TODO add delete users and edit users
# maybe add email confirmation too

# creates user
@app.route('/createUser', methods=['POST'])
def createUser():
    # gets user info
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'success':False, 'error': 'Missing fields'}), 400

    email = data['email']
    rawPassword = data['password']
    firstName = data['firstName']
    lastName = data['lastName']
    gradYear = data['gradYear']

    # Hash password
    hashedPassword = bcrypt.hashpw(rawPassword.encode('utf-8'), bcrypt.gensalt())

    # Get db connection
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success':False, 'error': 'DB failure'}), 500

    try:
        # Create user
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (firstName, lastName, email, passwordHash, gradYear) VALUES (%s, %s, %s, %i, %i)", 
                       (firstName, lastName, email, hashedPassword.decode('utf-8'), 0, gradYear))
        conn.commit()
        return jsonify({'success':True, 'message': 'User created'}), 201

    except Error as e:
        return jsonify({'success':False, 'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/teamSearch', methods=['GET'])
def teamSearch():
    #get team name
    team = request.args.get('team',"")
    
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success':False, 'error': 'DB failure'}), 500
    
    try:
        # Create user
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT 
                t.teamID,
                t.teamName,
                COUNT(u.userID) AS size
            FROM teams t
            LEFT JOIN users u ON t.teamID = u.teamID
            WHERE t.teamName LIKE %s
            GROUP BY t.teamID, t.teamName
        """

        cursor.execute(query, (f"%{team}%",))
        teams = cursor.fetchall()

        teamIDs = [t['teamID'] for t in teams]
        if not teamIDs:
            return jsonify({'success':False, 'teams':[]}), 200
        
        placeholders = ','.join(['%s'] * len(teamIDs))

        cursor.execute(f"""
            SELECT
                userID,
                firstName,
                lastName,
                email,
                gradYear,
                teamID
            FROM users
            WHERE teamID IN ({placeholders});
        """, tuple(teamIDs))

        users = cursor.fetchall()

        usersSorted = defaultdict(list)

        for u in users:
            usersSorted[u['teamID']].append({
                'userID': u['userID'],
                'firstName': u['firstName'],
                'lastName': u['lastName'],
                'email': u['email'],
                'gradYear': u['gradYear']
            })

        for t in teams:
            t['members'] = usersSorted.get(t['teamID'], [])

        return jsonify({'success': True, 'teams': teams}), 200

    except Error as e:
        return jsonify({'success':False, 'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@app.route('/getTeam', methods=['GET'])
def getTeam():
    #get team name
    teamID = request.args.get('teamID',None)

    print(teamID)

    if teamID is None:
        return jsonify({'success':False, 'error': 'Missing Params'}), 422
    
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success':False, 'error': 'DB failure'}), 500
    
    try:
        # Create user
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT 
                t.teamID,
                t.teamName,
                COUNT(u.userID) AS size
            FROM teams t
            LEFT JOIN users u ON t.teamID = u.teamID
            WHERE t.teamID = %s;
        """

        cursor.execute(query, (teamID,))
        team = cursor.fetchone()
        cursor.execute("""
            SELECT
                userID,
                firstName,
                lastName,
                email,
                gradYear,
                teamID
            FROM users
            WHERE teamID = %s;
        """,(teamID,))

        users = cursor.fetchall()

        team['members'] = users

        return jsonify({'success': True, 'team': team}), 200

    except Error as e:
        return jsonify({'success':False, 'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# TODO add JoinTeam, add Edit Team
# make sure people cannot edit if they are not the team owner allow transfering ownership
# and if the team is empty then delete it

# def updateUserTeam(user:int, teamID:int):
#     conn = get_db_connection()
#     if conn is None:
#         return jsonify({'success':False, 'error': 'DB failure'}), 500
    
#     try:
#         cursor = conn.cursor()

#         # Finish this code then make join + leave team

#     except Error as e:
#         return jsonify({'success':False, 'error': str(e)}), 500
#     finally:
#         cursor.close()
#         conn.close()
    
@app.route('/updateTeam', methods=['PATCH'])
@loginRequired
def updateTeam():
    data = request.get_json()
    print(data)

    user = data.get('userID', None)
    teamID = data.get('teamID', 'NULL')

    if user is None:
        return jsonify({'success':False, 'error': 'Missing Params'}), 422

    conn = get_db_connection()
    if conn is None:
        return jsonify({'success':False, 'error': 'DB failure'}), 500
    
    try:
        cursor = conn.cursor()
        cursor.execute("update users set teamID = %s where userID = %s",(teamID, user))
        conn.commit()

        session['teamID'] = teamID

        return jsonify({'success': True, 'message':'Joined team'}), 200

    except Error as e:
        return jsonify({'success':False, 'error': str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)