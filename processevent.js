var sendText = require('./sendtext');
var sendTypping = require('./typping');

function process_event(event, data){
    console.log('este es data en process_event ' + data);
    // Capturamos los datos del que genera el evento y el mensaje 
    var senderID = event.sender.id;
    var message = event.message;
    sendTypping.sendAction(senderID, 'typing_on').then((data)=>{
      console.log('TODO OK CON LA PROMESA ' + data);
    }).catch((error)=>{
      console.log('esto es un error ' + error);
    })
    // Si en el evento existe un mensaje de tipo texto
    if(message.text){
        var response = {
            "text": data
        }
    }
     else {
      var response = {
        "message":{
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text": data.title,
              "buttons":[
                {
                  
                  "title":"Visit Messenger"
                }
              ]
            }
          }
        }
      }
    
        console.log("creo que tenemos un error");
    }
    // Enviamos el mensaje mediante SendAPI 
    sendText.enviar_texto(senderID, response);
  };
  module.exports = {process_event};