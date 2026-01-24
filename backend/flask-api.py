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

# DB setup
CORS(app, supports_credentials=True)

db_config = {
    'host': os.getenv('MYSQL_HOST'),
    'database': os.getenv('MYSQL_DATABASE'),
    'user': os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD')
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
        if 'user' not in session:
            return jsonify({'error':'Not authenticated'}), 401
        return f(*args, **kwargs)
    return wrapper

@app.route('/auth', methods=['POST'])
def authenticate():
    data = request.get_json()
    email = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    if conn is None:
        return jsonify({'status': 'error', 'message': 'Database connection failed'}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user_record = cursor.fetchone()

        if not user_record:
            return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

        # Compare bcrypt hash with provided password
        if bcrypt.checkpw(password.encode('utf-8'), user_record['password'].encode('utf-8')):
            session.permanent = True
            session['id'] = user_record['id']
            session['firstName'] = user_record['firstName']
            session['email'] = email
            session['permissions'] = user_record['permissions']
            return jsonify({'status': 'success', 'message': 'Authenticated', 'roles':user_record['roles']}), 200
        else:
            return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

    except Error as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@app.route('/logout', methods=['POST'])
@loginRequired
def logout():
    session.clear()
    return jsonify({'status': 'success', 'message': 'Logged out'}), 200

@app.route('/currentUser', methods=['GET'])
@loginRequired
def currentUser():
    if 'user' in session:
        return jsonify({
            'id':session.get('id'),
            'firstName':session.get('firstName'),
            'lastName':session.get('lastName'),
            'email': session.get('email'),
            'permissions':session.get('permissions')
        }), 200
    else:
        return jsonify({
            'id':None,
            'firstName':None,
            'lastName':None,
            'email': None,
            'permissions':None
        }), 401

if __name__ == '__main__':
    app.run(debug=True)