var sendText = require('./sendtext');
var sendTypping = require('./typping');

function process_event(event, data){
    console.log('este es data en process_event ' + data);
    // Capturamos los datos del que genera el evento y el mensaje 
    
    sendTypping.sendAction(data.datos.senderID, 'typing_on').then((data)=>{
      console.log('TODO OK CON LA PROMESA ' + data);
    }).catch((error)=>{
      console.log('esto es un error ' + error);
    })
    // Si en el evento existe un mensaje de tipo texto
    if(message.text){
        var response = {
            "text": data.datos.output
        }
    }
     else {
      var response = {
        "text": data.datos.output
    }
        console.log("creo que tenemos un error");
    }
    // Enviamos el mensaje mediante SendAPI 
    sendText.enviar_texto(data.datos.senderID, response);
  };
  module.exports = {process_event};