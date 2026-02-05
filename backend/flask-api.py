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
from json import dumps

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

frontUrl = os.getenv('FRONTEND_URL')

CORS(
    app,
    supports_credentials=True,
    methods=["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
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
        if 'email' not in session:
            return jsonify({'error':'Not authenticated or not logged in'}), 401
        return f(*args, **kwargs)
    return wrapper

# authenticates user
@app.route('/auth', methods=["POST"])
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
            session['dietaryRestrictions'] = user_record.get('dietaryRestrictions')

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
            'teamID' : session.get('teamID'),
            'dietaryRestrictions': session.get('dietaryRestrictions')
        }), 200
    else:
        # else return none
        return jsonify({
            'id':None,
            'firstName':None,
            'lastName':None,
            'email': None,
            'gradYear': None,
            'dietaryRestrictions': None
        }), 401

# creates user
@app.route('/createUser', methods=['POST', 'OPTIONS'])
def createUser():
    if request.method == 'OPTIONS':
        return '', 200
    
    # gets user info
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'success':False, 'error': 'Missing fields'}), 400

    email = data['email']
    rawPassword = data['password']
    firstName = data['firstName']
    lastName = data['lastName']
    gradYear = data['gradYear']
    dietaryRestrictions = data['dietaryRestrictions']

    # Hash password
    hashedPassword = bcrypt.hashpw(rawPassword.encode('utf-8'), bcrypt.gensalt())

    # Get db connection
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success':False, 'error': 'DB failure'}), 500

    try:
        # Create user
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (firstName, lastName, email, passwordHash, gradYear, dietaryRestrictions) VALUES (%s, %s, %s, %s, %s, %s)", 
                       (firstName, lastName, email, hashedPassword.decode('utf-8'), gradYear, dumps(dietaryRestrictions)))
        conn.commit()
        return jsonify({'success':True, 'message': 'User created'}), 201

    except Error as e:
        return jsonify({'success':False, 'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# TODO finish delete users and edit users

@loginRequired
@app.route('/updateUser', methods=['PATCH', 'OPTIONS'])
def updateUser():
    if request.method == "OPTIONS":
        return "", 200
    
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "error": "No data provided"}), 400

    user_id = session.get("id")
    if not user_id:
        return jsonify({"success": False, "error": "Not authenticated"}), 401

    conn = get_db_connection()
    if conn is None:
        return jsonify({"success": False, "error": "DB failure"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)

        # Get current user
        cursor.execute(
            "SELECT email, passwordHash FROM users WHERE userID = %s",
            (user_id,)
        )
        current_user = cursor.fetchone()
        if not current_user:
            return jsonify({"success": False, "error": "User not found"}), 404

        current_email = current_user["email"]
        stored_hash = current_user["passwordHash"]

        updates = []
        values = []

        # ---- Email change (requires password) ----
        new_email = data.get("email")
        current_password = data.get("currentPassword")

        if new_email and new_email != current_email:
            if not current_password:
                return jsonify({"success": False, "error": "Password required to change email"}), 400

            if not bcrypt.checkpw(
                current_password.encode("utf-8"),
                stored_hash.encode("utf-8")
            ):
                return jsonify({"success": False, "error": "Incorrect password"}), 401

            updates.append("email = %s")
            values.append(new_email)

        # ---- Optional fields ----
        for field in ["firstName", "lastName", "gradYear"]:
            if field in data:
                updates.append(f"{field} = %s")
                values.append(data[field])

        # ---- Dietary restrictions (JSON) ----
        if "dietaryRestrictions" in data:
            updates.append("dietaryRestrictions = %s")
            if len(data["dietaryRestrictions"]) == 0:
                values.append(None)
            else:
                values.append(dumps(data["dietaryRestrictions"]))

        if not updates:
            return jsonify({"success": False, "error": "No changes provided"}), 400

        values.append(user_id)

        cursor.execute(
            f"UPDATE users SET {', '.join(updates)} WHERE userID = %s",
            tuple(values)
        )

        conn.commit()

        # Update session if email changed
        if new_email and new_email != current_email:
            session["email"] = new_email

        return jsonify({"success": True, "message": "User updated"}), 200

    except Error as e:
        return jsonify({"success": False, "error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@loginRequired
@app.route('/deleteUser', methods=['DELETE'])
def deleteUser():
    # gets user info
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'success':False, 'error': 'Missing fields'}), 400

    email = data['email']

    # Get db connection
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success':False, 'error': 'DB failure'}), 500

    try:
        # Delete user
        cursor = conn.cursor()
        cursor.execute()
        conn.commit()
        return jsonify({'success':True, 'message': 'User deleted'}), 201

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
                t.leaderID,
                l.firstName AS leaderFirstName,
                l.lastName  AS leaderLastName,
                COUNT(u.userID) AS memberCount
            FROM teams t
            LEFT JOIN users u ON t.teamID = u.teamID
            LEFT JOIN users l ON t.leaderID = l.userID
            WHERE t.teamName LIKE %s
            GROUP BY t.teamID, t.teamName, t.leaderID, l.firstName, l.lastName;
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
                t.leaderID,
                l.firstName AS leaderFirstName,
                l.lastName  AS leaderLastName,
                COUNT(u.userID) AS memberCount
            FROM teams t
            LEFT JOIN users u ON t.teamID = u.teamID
            LEFT JOIN users l ON t.leaderID = l.userID
            WHERE t.teamID = %s
            GROUP BY t.teamID, t.teamName, t.leaderID, l.firstName, l.lastName;
        """

        cursor.execute(query, (teamID,))
        team = cursor.fetchone()
        if team is None:
            return jsonify({'success': False, 'error': 'Team not found'}), 404
        

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

# TODO add Edit Team
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