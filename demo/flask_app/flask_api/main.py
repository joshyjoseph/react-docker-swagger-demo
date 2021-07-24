import json
from flask import Flask, request, Response
from flask_cors import CORS
from model import db, TeamModel
import random
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

SWAGGER_URL = '/doc'
API_URL = '/static/swagger.json'

SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "DemoApp"
    }
)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://demo_user:abcd1234@db:5432/demo_db'

db.init_app(app)
with app.app_context():
    db.create_all()
    db.session.commit()
    print("created the db")


@app.route('/add', methods=['POST'])
def add_team():
    if request.method == 'POST':
        team_name = request.json.get('teamName')
        team_role = request.json.get('teamRole')
        new_record = TeamModel(teamName=team_name, teamRole=team_role)
        print('new_record', new_record)
        db.session.add(new_record)
        db.session.commit()
        return Response(json.dumps({"status": "success"}), status=200, mimetype="application/json")
    else:
        return Response(json.dumps({"status": "failed : unsupported method type"}), status=405, mimetype="application/json")


@app.route('/fetch/', methods=['GET'])
def fetch_all_info():
    records = db.session.query(TeamModel).order_by(TeamModel.teamName).all()
    res = []
    for record in records:
        res.append(dict(
            rowId=record.rowId,
            teamName=record.teamName,
            teamRole=record.teamRole
        ))
    resp = Response(json.dumps(res), status=200, mimetype="application/json")
    return resp


@app.route('/fetch/<string:teamName>/', methods=['GET'])
def get_team_info(teamName):
    records = TeamModel.query.filter_by(teamName=teamName)
    res = []
    for record in records:
        res.append(dict(
            rowId=record.rowId,
            teamName=record.teamName,
            teamRole=record.teamRole
        ))
    return Response(json.dumps(res), status=200, mimetype="application/json")


@app.route("/", methods=['GET'])
def main():
    return {"status": "success"}


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5678)
