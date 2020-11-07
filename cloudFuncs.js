const functions = require('firebase-functions')
const app = require('./app')

const region = 'asia-east2';

const runtimeOpts = {
  timeoutSeconds: 5,
  memory: "2GB"
};

exports.Line = functions.region(region).runWith(runtimeOpts).https.onRequest(app)



//exports.LineBot = functions.region(region).https.onRequest(lineBot)