from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from models import User, Tournament, Match

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
      username=data["username"],
      email=data["email"]
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
      players=data["players"],
      organizer=data["organizer"],
      uuid=data["uuid"]
    )
    db.session.add(tournament)
    db.session.commit()
    return "Tournament added. tournament id={}".format(tournament.id)
  except Exception as e:
    return(str(e))

@app.route("/tournaments/getall", methods=["GET"])
def get_all_tournaments():
  try:
    tournaments = Tournament.query.all()
    return jsonify([e.serialize() for e in tournaments])
  except Exception as e:
    return(str(e))

@app.route("/tournaments/get/<uuid_>", methods=["GET"])
def get_tournament_by_uuid(uuid_):
  try:
    tournament=Tournament.query.filter_by(uuid=uuid_).first()
    return jsonify(tournament.serialize())
  except Exception as e:
    return(str(e))

# Matches
@app.route("/tournaments/matches", methods=["GET"])
def get_all_matches():
  try:
    match = Match.query.all()
    return jsonify([e.serialize() for e in match])
  except Exception as e:
    return(str(e))

@app.route("/tournaments/<tournamentUUID_>/<matchId_>", methods=["GET"])
def get_match_by_tournamentUUID_and_matchId(tournamentUUID_, matchId_):
  try:
    match = Match.query.filter_by(tournamentUUID=tournamentUUID_, matchId=matchId_).first()
    return jsonify([e.serialize() for e in match])
  except Exception as e:
    return(str(e))

@app.route("/tournaments/<tournamentUUID_>", methods=["GET"])
def get_match_by_tournamentUUID(tournamentUUID_):
  try:
    match = Match.query.filter_by(tournamentUUID=tournamentUUID_)
    return jsonify([e.serialize() for e in match])
  except Exception as e:
    return(str(e))

@app.route("/tournaments/create_match", methods=['POST'])
def add_match():
  data=request.get_json()
  try:
    match=Match(
      player1=data["player1"],
      player2=data["player2"],
      score1=data["score1"],
      score2=data["score2"],
      matchId=data["matchId"],
      tournamentUUID=data["tournamentUUID"],
    )
    db.session.add(match)
    db.session.commit()
    return "Tournament added. tournament id={}".format(match.id)
  except Exception as e:
    return(str(e))

@app.route("/tournaments/update/<tournamentUUID_>/<matchId_>", methods=['POST'])
def edit_match(tournamentUUID_, matchId_):
  data=request.get_json()
  try:
    match=Match.query.filter_by(tournamentUUID=tournamentUUID_, matchId=matchId_).first()
    match.player1 = data["player1"]
    match.player2 = data["player2"]
    match.score1 = data["score1"]
    match.score2 = data["score2"]
    db.session.commit()
    return "Tournament added. tournament id={}".format(match.id)
  except Exception as e:
    return(str(e))

@app.route("/tournaments/update_score/<tournamentUUID_>/<matchId_>", methods=['POST'])
def edit_match_score(tournamentUUID_, matchId_):
  data=request.get_json()
  try:
    match=Match.query.filter_by(tournamentUUID=tournamentUUID_, matchId=matchId_).first()
    match.score1 = data["score1"]
    match.score2 = data["score2"]
    db.session.commit()
    return "Tournament added. tournament id={}".format(match.id)
  except Exception as e:
    return(str(e))

if __name__ == '__main__':
  app.run()