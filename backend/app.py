from flask import Flask,request, Blueprint, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
from address import address
app = Flask(__name__)
ors = CORS(app, resources={r"/api/*": {"origins": ["http://192.168.2.20"]}})
@app.route('/')
def initial():
 team = "Lakers" 
 return team

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Lakers12630!@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.register_blueprint(address)



bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(150), unique=True)
    
    created_at = db.Column(db.Date, default=datetime.utcnow)

    def __repr__(self):
        return f"Email:{self.email}"

    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = password
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))


# def format_user(user):
#  return {
#         "name":user.name,
#         "email":user.email,
#         "password":user.password
        
#  }  
class ReservedSeats (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    address = db.Column(db.String(300))
    chairs = db.Column(db.JSON)
    circle_Chairs = db.Column(db.JSON)
    horizontal_Table = db.Column(db.JSON)
    vertical_Table = db.Column(db.JSON)
app.app_context().push()
db.create_all()


@app.route('/api/login', methods =['POST'])
def login():
   email = request.json.get('email')
   password = request.json.get('password')
   if not email or not password:
        return jsonify({"error": "Invalid request. Please provide email and password."}), 400

    # Retrieve the user from the database based on the provided email
   user = User.query.filter_by(email=email).first()
   
   if not user:
        return jsonify({"error": "User not found."}), 404

    # Check if the provided password matches the hashed password in the database
   if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials."}), 401

    # Authentication successful
   return jsonify({"message": "Login successful."}), 200



@app.route('/api/register', methods=['POST'])
def register():
 email = request.json.get('email')
 existing_email = User.query.filter_by(email=email).first()

 if existing_email:
    return jsonify(message='A user with this email already exists.'), 409

 name = request.json.get('name')
 password = request.json.get('password')
 hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
 user = User(email, name, hashed_password)
 db.session.add(user)
 try:
    db.session.commit()
 except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "A user with this email already exists"}), 500

 return jsonify({"message": "User registered successfully."}), 201


@app.route('/api/reservedSeats', methods = ['POST'])
def reserveSeats():
    address = request.json['address']
    chairs = request.json['chairs']
    circleChairs = request.json['circleChairs']
    horizontalTable = request.json['horizontalTable']
    verticalTable = request.json['verticalTable']
    name = request.json['name'] 

    reservedSeats = ReservedSeats(
        name = name,
        address = address,
        chairs = chairs, 
        circle_Chairs = circleChairs,
        horizontal_Table = horizontalTable,
        vertical_Table = verticalTable
    )   
    db.session.add(reservedSeats)
    db.session.commit()

    return jsonify({"message": "Saved Layout"}) , 200
#  elif existing_user is None:
 
@app.route('/api/getReservedSeats', methods =['GET'])
def getReservedSeats():
    name = request.args.get('name')
    address = request.args.get('address')

#TODO 
# fix the query,
# query is being done incorrectly
    reserved_seats_data = ReservedSeats.query.filter_by(name=name, address=address).first()
    if reserved_seats_data:
        # If data is found, create a response dictionary containing the desired JSON data
        response = {
            'chairs': reserved_seats_data.chairs,
            # 'circle_chairs': reserved_seats_data.circle_Chairs,
            # 'horizontal_table': reserved_seats_data.horizontal_Table,
            # 'vertical_table': reserved_seats_data.vertical_Table
        }
        return jsonify(response)
    else:
        # If no data is found, return an error response
        return jsonify({'message': 'No data found for the provided name and address.'}), 404

# @app.route('/event/<id>', methods=['GET'])
# def get_one_user(id):
#     user = User.query.filter_by(id=id).one()
#     formatted_user = format_user(user)
#     return {'users':formatted_user}

# @app.route('/event/<id>', methods=['GET','DELETE'])
# def delete_user(id):
#        user = User.query.filter_by(id=id).one()
#        db.session.delete(user)
#        db.session.commit()
#        return f'User (id:{id})deleted'


# @app.route('/event/<id>', methods =['PUT'])
# def update_user(id):
#     user = User.query.filter_by(id=id)
#     email = request.json['email']
#     user.update(dict(email = email, created_at = datetime.utcnow()))
#     db.session.commit()
#     return{'user':format_user(user.one())}

if __name__ == "__main__":
    app.run(host='192.168.2.20',port=5000,debug=True)