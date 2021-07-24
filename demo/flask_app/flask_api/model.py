from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class TeamModel(db.Model):
    rowId = db.Column(db.Integer, primary_key=True)
    teamName = db.Column(db.String)
    teamRole = db.Column(db.String)

    def __repr__(self) -> str:
        return "{}:{}:{}".format(self.rowId, self.teamName, self.teamRole)
