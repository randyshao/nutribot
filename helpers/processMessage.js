const API_AI_TOKEN = '310cc64fe9ab436e893fbd7847257bba';
const dialogflowClient = require('dialogflow')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'your Facebook Page Access Token';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
    url: 'EAAB9Ln9GcYwBAGnWY21wOsEsLZAfupq11ld73Iygvukuj4pscmQByHmtFZAfJCbZB88XEs5uBZAcrBXvngENMoLGHpPCE4O09qYYcUZAgRYH3jsYWeF5PETNa62f6qDBwTRDpF4KkGfAWJ66TXWEsycKC3dloDEVmhoXF9xRFGsPSacaEcg0xgwjwFr1cQFwZD',
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
    recipient: { id: senderId },
    message: { text },
    }
 });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const dialogflowSession = dialogflowClient.textRequest(message, {sessionId: 'nutribot'});
    dialogflowSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    dialogflowSession.on('error', error => console.log(error));
    dialogflowSession.end();
};