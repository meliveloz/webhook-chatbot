var sendText = require('./sendtext');
var sendTypping = require('./typping');

function process_event(event, data){
    console.log('este es el TITULO data en process_event ')
    console.log(data.title)
    // Capturamos los datos del que genera el evento y el mensaje 
    var senderID = event.sender.id;
    var message = event.message;
    sendTypping.sendAction(senderID, 'typing_on').then(()=>{
      console.log('TODO OK CON LA PROMESA ' + data.title);
    }).catch((error)=>{
      console.log('esto es un error ' + error);
    })
    // Si en el evento existe un mensaje de tipo texto
   /* if(message.text){
        var response = {
            "text": data
        }
    }
     else {*/
      var response = {
          "attachment":{
            "type":"template",
            "payload":{
              "template_type":"button",
              "text":data.title,
              "buttons":[
                {
                  "type":"postback",
                  "title":"Show Website",
                  "payload":"lol"
                },
                {
                  "type":"postback",
                  "title":"Start Chatting",
                  "payload":"USER_DEFINED_PAYLOAD"
                }
              ]
            }
          }
      
      }
    
        console.log("creo que tenemos un error");
    
    // Enviamos el mensaje mediante SendAPI 
    sendText.enviar_texto(senderID, response);
  };
  module.exports = {process_event};