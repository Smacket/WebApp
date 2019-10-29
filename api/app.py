from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User, Tournament

@app.route("/")
def hello():
  return "Hello World!"

# User 
@app.route("/add", methods=['POST'])
def add_user():
  data=request.get_json()
  try:
    user=User(
      name=data["name"],
      email=data["email"],
    )
    db.session.add(user)
    db.session.commit()
    return "User added. user id={}".format(user.id)
  except Exception as e:
    return(str(e))

@app.route("/getall", methods=["GET"])
def get_all():
  try:
    users = User.query.all()
    return jsonify([e.serialize() for e in users])
  except Exception as e:
    return(str(e))

@app.route("/get/<email_>")
def get_by_email(email_):
  try:
    user=User.query.filter_by(email=email_).first()
    return jsonify(user.serialize())
  except Exception as e:
    return(str(e))

# Tournament
@app.route("/tournaments/create", methods=['POST'])
def add_tournament():
  data=request.get_json()
  try:
    tournament=Tournament(
      name=data["name"],
      location=data["location"],
      date=data["date"],
      description=data["description"],
      players=data["players"]
    )
    db.session.add(tournament)
    db.session.commit()
    return "Tournament added. tournament id={}".format(user.id)
  except Exception as e:
    return(str(e))

@app.route("/tournaments/getall", methods=["GET"])
def get_all_tournaments():
  try:
    tournaments = Tournament.query.all()
    return jsonify([e.serialize() for e in tournaments])
  except Exception as e:
    return(str(e))

if __name__ == '__main__':
  app.run()