// Funcion donde el chat respondera usando SendAPI
var request = require("request");

function enviar_texto(senderID, response){
    // Construcicon del cuerpo del mensaje
    let request_body = {
        "recipient": {
          "id": senderID
        },
        "message": response
    }
    // Enviar el requisito HTTP a la plataforma de messenger
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
          console.log("enviando requisito HTTP")
        } else {
          console.error("No se puedo enviar el mensaje:" + err);
        }
    }); 
  }
  module.exports = {enviar_texto};