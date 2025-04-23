from flask import Blueprint, request, jsonify
from models import db, People, Planet,User, Favorite

bpMain = Blueprint("bpMain", __name__)

@bpMain.route('/', methods=['GET'])
def main():
    return jsonify({"status": "Server is running"}), 200

#[GET] /people Listar todos los registros de people en la base de datos.
#Funcionando
@bpMain.route('/people', methods=['GET'])
def get_all_peoples():
    people = People.query.all()
    people_serial = [p.read() for p in people]
    return jsonify(people_serial), 200

#[GET] /people/<int:people_id> Muestra la información de un solo personaje según su id.
#Funcionando
@bpMain.route('/people/<int:id>', methods=['GET'])
def get_people_id(id):
    people = People.query.filter(
        People.id == id
    ).first()
    if not people:
        return jsonify({"error": "People not found"}), 404
    return jsonify(people.read())

#[GET] /planets Listar todos los registros de planets en la base de datos.
# Funcionando
@bpMain.route('/planets', methods=['GET'])
def get_planets ():
    planets = Planet.query.all()
    planets_serial = [p.read() for p in planets]
    return jsonify(planets_serial), 200

#[GET] /planets/<int:planet_id> Muestra la información de un solo planeta según su id.
#Funcionando
@bpMain.route('/planets/<int:id>', methods=['GET'])
def get_planet_by_id(id):
    planet = Planet.query.filter(
        Planet.id == id
    ).first()
    if not planet:
        return jsonify({"error": "Planet not found"}), 404
    return jsonify(planet.read()), 200

#[GET] /users Listar todos los usuarios del blog.
#Funcionando
@bpMain.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_serial = [u.read() for u in users]
    return jsonify(users_serial), 200

#[GET] /users/favorites Listar todos los favoritos que pertenecen al usuario actual.
#Funcionando
@bpMain.route('/users/<int:id>/favorites', methods=['GET'])
def get_favorites_from_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    favorites = Favorite.query.filter_by(user_id=id).all()

    favorite_planets = []
    favorite_people = []

    for fav in favorites:
        if fav.favorite_type == "planet":
            planet = Planet.query.get(fav.favorite_id)
            if planet:
                favorite_planets.append(planet.read())
        elif fav.favorite_type == "people":
            person = People.query.get(fav.favorite_id)
            if person:
                favorite_people.append(person.read())

    return jsonify({
        "favorite_planets": favorite_planets,
        "favorite_people": favorite_people
    }), 200

#[POST] /favorite/planet/<int:planet_id> Añade un nuevo planet favorito al usuario actual con el id = planet_id.
#Funcionando
@bpMain.route('/favorites/post', methods=['POST'])
def post_favorite():
    data = request.get_json()
    
    if 'user_id' not in data:
        return jsonify({"msg": "user_id is required"}), 400
    if 'favorite_type' not in data:
        return jsonify({"msg": "favorite_type is required"}), 400
    if 'favorite_id' not in data:
        return jsonify({"msg": "favorite_id is required"}), 400

    # Valida el tipo
    if data['favorite_type'] not in ['planet', 'people']:
        return jsonify({"msg": "favorite_type must be 'planet' or 'people'"}), 400

    #Valida el item
    item = None
    if data['favorite_type'] == 'planet':
        item = Planet.query.get(data['favorite_id'])
    elif data['favorite_type'] == 'people':
        item = People.query.get(data['favorite_id'])

    if not item:
        return jsonify({"msg": "Item not found"}), 404

    favorite = Favorite(
        user_id = data['user_id'],
        favorite_type = data['favorite_type'],
        favorite_id = data['favorite_id'],
    )
    db.session.add(favorite)
    db.session.commit()

    return jsonify(favorite.read()), 201


#[POST] /favorite/people/<int:people_id> Añade un nuevo people favorito al usuario actual con el id = people_id.
# Al endpoint de arriba se le agregó la capacidad de agregar el planet o people

#[DELETE] /favorite/planet/<int:planet_id> Elimina un planet favorito con el id = planet_id.
# Funcionandoo
@bpMain.route('/favorite/planet/<int:planet_id>/user/<int:user_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id, user_id):
    favorite = Favorite.query.filter_by(
        user_id=user_id,
        favorite_type='planet',
        favorite_id=planet_id
    ).first()
    
    if not favorite:
        return jsonify({"msg": f"Favorite planet with id {planet_id} for user {user_id} does not exist"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"status": "success", "msg": "Favorite planet deleted"}), 200


#[DELETE] /favorite/people/<int:people_id> Elimina un people favorito con el id = people_id.
# Funcionando
@bpMain.route('/favorite/people/<int:people_id>/user/<int:user_id>', methods=['DELETE'])
def delete_favorite_people(people_id, user_id):
    favorite = Favorite.query.filter_by(
        user_id=user_id,
        favorite_type='people',
        favorite_id=people_id
    ).first()

    if not favorite:
        return jsonify({"msg": f"Favorite people with id {people_id} for user {user_id} does not exist"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"status": "success", "msg": "Favorite people deleted"}), 200
