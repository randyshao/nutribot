const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
//const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./helpers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// const app_id = '29928df0'
// const app_key = '1350d047cf8c640608deb36a4c9eec55'
// // const url = `https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=${food}&app_id=${app_id}&app_key=${app_key}`
// const url1 = `https://api.edamam.com/api/food-database/parser?nutrition-type=logging&ingr=red%20apple&app_id=29928df0&app_key=1350d047cf8c640608deb36a4c9eec55`

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://nutribot-huwsre.firebaseio.com"
//   });

//   const { SessionsClient } = require('dialogflow');


//   exports.dialogflowGateway = functions.https.onRequest((request, response) => {
    
//     const { queryInput, sessionId } = request.body;
//     const sessionClient = new SessionsClient({ credentials: serviceAccount  });
//     const session = sessionClient.sessionPath('your-project', sessionId);
  
//     const responses = await sessionClient.detectIntent({ session, queryInput});
//     const result = responses[0].queryResult;
//     result.fulfillmentText
//     response.send(result);

//   });

// request(url1, (error, response, body) => {
//     const data = JSON.parse(body);
//     console.log(data)
// })

