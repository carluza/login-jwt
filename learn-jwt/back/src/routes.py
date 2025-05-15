from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from werkzeug.security import check_password_hash
from sqlalchemy.exc import IntegrityError
from models import User, Profile, db


api = Blueprint("api", __name__)

from models import User, Profile

from flask import request, jsonify
from sqlalchemy.exc import IntegrityError
from models import User, Profile, db
from flask import Blueprint

api = Blueprint("api", __name__)

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User(email=email)
    user.set_password(password)

    try:
        user.save()


        profile = Profile(users_id=user.id)
        profile.save()

    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Email already registered"}), 409

    return jsonify({"message": "User created successfully"}), 201



@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401


    access_token = create_access_token(identity=str(user.id))



    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200

@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user or not user.profile:
        return jsonify({"error": "Profile not found"}), 404

    return jsonify({
        "success": "Path protected!",
        "profile": user.profile.serialize()
    }), 200



@api.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    data = request.get_json()
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    profile = user.profile

    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    # Actualiza los campos del perfil
    for key, value in data.items():
        if hasattr(profile, key):
            setattr(profile, key, value)

    profile.save()

    return jsonify({"message": "Profile updated successfully", "profile": profile.serialize()}), 200