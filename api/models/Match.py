from app import db

class Match(db.Model):
  __tablename__ = 'matches'

  id = db.Column(db.Integer, primary_key=True)
  tournamentUUID = db.Column(db.String())
  matchId = db.Column(db.Integer())
  player1 = db.Column(db.String())
  player2 = db.Column(db.String())
  score1 = db.Column(db.Integer())
  score2 = db.Column(db.Integer())

  def __init__(self, matchId, tournamentUUID, player1, player2, score1, score2):
    self.matchId = matchId
    self.tournamentUUID = tournamentUUID
    self.player1 = player1
    self.player2 = player2
    self.score1 = score1
    self.score2 = score2

  def __repr__(self):
    return '<id {}>'.format(self.id)
  
  def serialize(self):
    return {
      'id': self.id, 
      'matchId': self.matchId,
      'tournamentUUID': self.tournamentUUID,
      'player1': self.player1,
      'player2': self.player2,
      'score1': self.score1,
      'score2': self.score2
    }