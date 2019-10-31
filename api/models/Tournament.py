from app import db
from .Match import Match

class Tournament(db.Model):
  __tablename__ = 'tournaments'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String())
  location = db.Column(db.String())
  date = db.Column(db.Integer())
  description = db.Column(db.String())
  players = db.Column(db.ARRAY(db.String())) 
  organizer = db.Column(db.String())
  uuid = db.Column(db.String())

  def __init__(self, name, location, date, description, players, organizer, uuid):
    self.name = name
    self.location = location
    self.date = date
    self.description = description
    self.players = players
    self.organizer = organizer
    self.uuid = uuid

  def __repr__(self):
    return '<id {}>'.format(self.id)
  
  def serialize(self):
    return {
      'id': self.id, 
      'name': self.name,
      'location': self.location,
      'date': self.date,
      'description': self.description,
      'players': self.players,
      'organizer': self.organizer,
      'uuid': self.uuid
    }