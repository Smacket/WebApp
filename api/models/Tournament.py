from app import db

class Tournament(db.Model):
  __tablename__ = 'tournament'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String())
  location = db.Column(db.String())
  date = db.Column(db.Integer())
  description = db.Column(db.String())
  players = db.Column(db.ARRAY(db.String())) 

  def __init__(self, name, location, date, description, players):
    self.name = name
    self.location = location
    self.date = date
    self.description = description
    self.players = players

  def __repr__(self):
    return '<id {}>'.format(self.id)
  
  def serialize(self):
    return {
      'id': self.id, 
      'name': self.name,
      'location': self.location,
      'date': self.date,
      'description': self.description,
      'players': self.players
    }