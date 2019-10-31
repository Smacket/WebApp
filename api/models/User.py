from app import db

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String())
  username = db.Column(db.String())
  email = db.Column(db.String())

  def __init__(self, name, username, email):
    self.name = name
    self.username = username
    self.email = email

  def __repr__(self):
    return '<id {}>'.format(self.id)
  
  def serialize(self):
    return {
      'id': self.id, 
      'name': self.name,
      'username': self.username,
      'email': self.email
    }