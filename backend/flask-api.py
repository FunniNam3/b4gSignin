from flask import Flask, request, jsonify, session
import mysql.connector
from mysql.connector import Error
import bcrypt
from datetime import timedelta
from flask_cors import CORS
from functools import wraps
import os
from dotenv import load_dotenv

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
    origins=["http://localhost:5173"],
    methods=["GET", "POST", "OPTIONS"],
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
        print(f"Error connecting to MySQL: {e}")
        return None

# makes sure user is loggedin
def loginRequired(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'email' not in session:
            return jsonify({'error':'Not authenticated or not logged in'}), 401
        return f(*args, **kwargs)
    return wrapper

# authenticates user
@app.route('/auth', methods=['POST'])
def authenticate():
    # gets data from json
    data = request.get_json()
    email = data.get('username')
    password = data.get('password')

    # connects to database
    conn = get_db_connection()
    if conn is None:
        return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500

    try:
        # gets user info
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            """
            SELECT userID, firstName, lastName, email, gradYear, permissions, passwordHash
            FROM users
            WHERE email = %s
            """,
            (email,)
        )
        user_record = cursor.fetchone()

        # if fail return
        if not user_record:
            return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

        # Compare bcrypt hash with provided password
        if bcrypt.checkpw(password.encode("utf-8"), user_record["passwordHash"].encode("utf-8")):
            # If match make session and add user
            session.permanent = True
            session['id'] = user_record.get('id')
            session['firstName'] = user_record.get('firstName')
            session['email'] = email
            session['permissions'] = user_record.get('permissions')
            session['lastName'] = user_record.get('lastName')
            session['gradYear'] = user_record.get('gradYear')

            return jsonify({'status': 'success', 'message': 'Authenticated', 'roles':user_record['roles']}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

    except Error as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# logs out current user
@app.route('/logout', methods=['POST'])
@loginRequired
def logout():
    session.clear()
    return jsonify({'status': 'success', 'message': 'Logged out'}), 200

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
            'permissions':session.get('permissions'),
            'gradYear': session.get('gradYear')
        }), 200
    else:
        # else return none
        return jsonify({
            'id':None,
            'firstName':None,
            'lastName':None,
            'email': None,
            'permissions':None,
            'gradYear': None
        }), 401
    
# creates user
@app.route('/createUser', methods=['POST'])
def create_user():
    # gets user info
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing fields'}), 400

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
        return jsonify({'error': 'DB failure'}), 500

    try:
        # Create user
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (firstName, lastName, email, password, permissions, gradYear) VALUES (%s, %s, %s, %i, %i)", 
                       (firstName, lastName, email, hashedPassword.decode('utf-8'), 0, gradYear))
        conn.commit()
        return jsonify({'status': 'success', 'message': 'User created'}), 201

    except Error as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)