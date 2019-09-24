var sendText = require('./sendtext');

function handlePostback(event) {
    var senderID = event.sender.id;
    var message = event.postback;
    let response;

    // Get the payload for the postback
    let payload = message.payload;
  
    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Gracias, me caes bien" }
    } else if (payload === 'no') {
      response = { "text": "mmm no me caes bien" }
    } else if (payload === 'SI'){
        response = {"text": "OK, te veo despues"}
    } else if (payload === "NO") {
        response = {"text": "entonces no me amenaces!!"}
    }
    // Send the message to acknowledge the postback
    sendText.enviar_texto(senderID, response);
  }

  module.exports = {handlePostback};