const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
//const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./helpers/messageWebhook');
app.get('/', verificationController);
app.post('/', messageWebhookController);

const port = process.env.PORT || 5000;

// Create an endpoint that recieves a POST request to ..url../query (This is an asynchronous)
app.post('/query', async (req, res) => {
    try {
        // heroku logs --tail
        console.log(req.body);

        // Destructure the JSON that Dialogflow sends to this endpoint
        const { queryResult } = req.body;

        // Destructure some more
        const query = queryResult.queryText
        
        // Create the URI to the food database thing endpoint
        const uri = "https://api.edamam.com/api/food-database/parser";

        // Use Axios to send a GET request to that API with parameters, one being the query 
        const res = await axios.get(uri, { params: {
                "nutrition-type": "logging",
                ingr: query,
                "app_id": "29928df0",
                "app_key": "1350d047cf8c640608deb36a4c9eec55"
            }
        });

        console.log(res.data)

        // Destructure data out of that response, whatever you want
        const calories = res.data.parsed[0].food.nutrients.ENERC_KCAL;

        // Build a actual like presentable text sentence for the user based on that destructured data
        const sentence = `${ingr} has ${calories} calories!`;

        // Build the JSON for diagflow
        const response = {
            fulfillmentText: sentence,
            payload: {
                facebook: {
                    text: sentence
                }
            }
        }

        // Send it back
        res.json(response);


    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "Please check your food!"})
    }
});

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

