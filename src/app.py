"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import datetime

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False



# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config ["JWT_SECRET_KEY"] = "secret_key"
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)
jwt = JWTManager(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route("/register_user", methods=["POST"])
def register_user():
    user = User()
    user.email = request.json.get("email")
    user.password = request.json.get("password")
    db.session.add(user)
    db.session.commit()
    return jsonify({"User registered"}), 202

@app.route("/delete_user", methods=['DELETE'])
def delete_fav_planet(user_id):
    one = User.query.filter_by(user_id =planet_id).first()
    user = User.query.get(1)
    if(one):
        db.session.delete (one)
        db.session.commit()
        return "Eliminado"
    else:
        raise APIException("No existe planeta", status_code=404)

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    try:    
        current_user = get_jwt_identity()
        return jsonify(msg = "ok"), 200
    except Exception as e:
        print("error:", e)
        return jsonify(msg = "error"), 401 

@app.route("/login", methods=['POST'])
def login():
    body = request.get_json()
    one = User.query.filter_by(
        email=body["email"], password=body["password"]).first()
    if (not one):
        return jsonify({"msg": 'Usuario y/o contraseña incorrectos'}), 401

    else:
        expire = datetime.timedelta(hours=1)
        access = create_access_token(
            identity=body["email"], expires_delta=expire)
        return jsonify({
            "login": "ok",
            "token": access,
            "tiempo": expire.total_seconds(),
            "user_id": one.id
        })
    print(body)
    return jsonify({"msg": "User registered"}), 202

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
