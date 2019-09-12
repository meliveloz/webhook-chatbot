// Funcion donde el chat respondera usando SendAPI

function enviar_texto(senderID, response){
    // Construcicon del cuerpo del mensaje
    try{
        sendAction(senderID, 'typing_on');
    }catch(err){
        console.log('error del catch');
    }
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

function sendAction(data,action) {
    return new Promise((resolve, reject) => {
      request({
        url: 'https://graph.facebook.com/v3.1/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
          recipient: {id: data},
          sender_action: action
        }
      }, (error, response) => {
        if (error) {
          reject('ERROR_FACEBOOK_SENDING_ACTION=');
        } else if (response.body.error) {
          reject('ERROR_FACEBOOK_SENDING_ACTION=');
        }
  
        resolve(data);
      });
    });
  }
  module.exports = {enviar_texto};