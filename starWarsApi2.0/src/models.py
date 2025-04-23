from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)

    favorites = db.relationship('Favorite', backref='user')
    def read (self):
        return {
            "id": self.id,
            "username": self.username
        }

class People(db.Model):
    __tablename__ = 'peoples'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    def read (self):
        return {
            "id": self.id,
            "name": self.name
        }

class Planet(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    def read (self):
        return {
            "id": self.id,
            "name": self.name
        }
class Favorite(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    favorite_type = db.Column(db.String(50), nullable=False)  # "planet" o "people"
    favorite_id = db.Column(db.Integer, nullable=False)  # ID de planet o people, según el tipo

    def read(self):
        item = None
        if self.favorite_type == "planet":
            item = Planet.query.get(self.favorite_id)
        elif self.favorite_type == "people":
            item = People.query.get(self.favorite_id)

        return {
            "id": self.id,
            "user_id": self.user_id,
            "favorite_type": self.favorite_type,
            "favorite_id": self.favorite_id,
            "item": item.read() if item else None
        }
