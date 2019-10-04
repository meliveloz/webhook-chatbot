var sendText = require('./sendtext');
var sendTypping = require('./typping');

function process_event(event, data){
    console.log('este es data en process_event ')
    console.log(data)
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
              "text":"What do you want to do next?",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://petersapparel.parseapp.com",
                  "title":"Show Website"
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
      }
    
        console.log("creo que tenemos un error");
    }
    // Enviamos el mensaje mediante SendAPI 
    sendText.enviar_texto(senderID, response);
  };
  module.exports = {process_event};