import os
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
from routes import bpMain
from models import db

load_dotenv()

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

db.init_app(app)
Migrate(app, db)
CORS(app)

app.register_blueprint(bpMain)

if __name__ == '__main__':
    app.run(
        host='localhost', port=8000, debug=True
    )