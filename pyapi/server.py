from __future__ import print_function
import json
from flask import Flask
from flask import jsonify
from oauth2client import client, file, tools
from httplib2 import Http
from apiclient import discovery
app = Flask(__name__)

SCOPES = "https://www.googleapis.com/auth/forms.responses.readonly"
DISCOVERY_DOC = "https://forms.googleapis.com/$discovery/rest?version=v1"


@app.route('/get_response/', methods=['GET', 'POST'])
def get_response():
    store = file.Storage('token.json')
    creds = None
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('client_secrets.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = discovery.build('forms', 'v1', http=creds.authorize(
        Http()), discoveryServiceUrl=DISCOVERY_DOC, static_discovery=False)
    form_id = '1Blx5j5kTduOK7kAtYw0WaJKnTKtZ12DLiJJJ77NZAZQ'
    result = service.forms().responses().list(formId=form_id).execute()
    # print(result)

    for res in result["responses"]:
        for r in res["answers"]:
            print(r)
            # for a in r["answers"]:
            #     print(a)

    return jsonify(result)


@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    txt = "{'responses': [{'responseId': 'ACYDBNjOZ8JjfL0V5oGw5b7iUeYSNHgcgJ_yOkJRFy16_WYBA3_KMNru3csPIJXYAwR9Rqs', 'createTime': '2022-04-07T08:33:53.365Z', 'lastSubmittedTime': '2022-04-07T08:33:53.365087Z', 'answers': {'40d1425e': {'questionId': '40d1425e', 'grade': {}, 'textAnswers': {'answers': [{'value': 'ss'}]}}, '1c706f7e': {'questionId': '1c706f7e', 'grade': {'score': 1, 'correct': True}, 'textAnswers': {'answers': [{'value': 'cc'}]}}, '2132bf24': {'questionId': '2132bf24', 'grade': {'score': 1, 'correct': True}, 'textAnswers': {'answers': [{'value': 'aa'}]}}, '07b9defb': {'questionId': '07b9defb', 'grade': {}, 'textAnswers': {'answers': [{'value': 'sakda'}]}}}, 'totalScore': 2}, {'responseId': 'ACYDBNgWgExnNr7oy5pxZ1MN2zz4x0yDx0L3T3szAjQk0Mije8olNxVHAdY6OoW2mjLUmRw', 'createTime': '2022-04-07T08:34:13.763Z', 'lastSubmittedTime': '2022-04-07T08:34:13.763775Z', 'answers': {'40d1425e': {'questionId': '40d1425e', 'grade': {'score': 1, 'correct': True}, 'textAnswers': {'answers': [{'value': 'bb'}]}}, '1c706f7e': {'questionId': '1c706f7e', 'grade': {'score': 1, 'correct': True}, 'textAnswers': {'answers': [{'value': 'cc'}]}}, '2132bf24': {'questionId': '2132bf24', 'grade': {'score': 1, 'correct': True}, 'textAnswers': {'answers': [{'value': 'aa'}]}}, '07b9defb': {'questionId': '07b9defb', 'grade': {}, 'textAnswers': {'answers': [{'value': 'jik'}]}}}, 'totalScore': 3}]}"
    return "Hello World!"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3200)
