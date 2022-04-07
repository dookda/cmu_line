from __future__ import print_function
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
    return jsonify(result)


@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3200)
