from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/add", methods=['POST'])
def add_book():
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

if __name__ == '__main__':
  app.run()