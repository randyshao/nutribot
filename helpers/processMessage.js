const API_AI_TOKEN = '310cc64fe9ab436e893fbd7847257bba';
const dialogflowClient = require('dialogflow')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAB9Ln9GcYwBADzwm9wA6EvQJS1YvqsYWnpH1XW8faLxqFMPJaZAr8ZBZCGOa8vZBAZCEwpsCy0EmBP0M41ZBLbxkCcgOvVFuNBsj9T9WnTCgYq3qvhD5Ww9d6beJuYL2aadB33G6r2ZBEvUi1lOt6D5QJy40M1jF6RScMHhEG45ZCCcSYXUdw2FZCq2ZBQpsZCWdAZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
    url: 'EAAB9Ln9GcYwBADzwm9wA6EvQJS1YvqsYWnpH1XW8faLxqFMPJaZAr8ZBZCGOa8vZBAZCEwpsCy0EmBP0M41ZBLbxkCcgOvVFuNBsj9T9WnTCgYq3qvhD5Ww9d6beJuYL2aadB33G6r2ZBEvUi1lOt6D5QJy40M1jF6RScMHhEG45ZCCcSYXUdw2FZCq2ZBQpsZCWdAZD',
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