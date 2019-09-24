var sendText = require('./sendtext');
var sendTypping = require('./typping');

function process_event(event, data){
    console.log('este es data en process_event ' + data);
    // Capturamos los datos del que genera el evento y el mensaje 
    var senderID = event.sender.id;
    var message = event.message;
    sendTypping.sendAction(senderID, 'typing_on').then((data)=>{
      console.log('TODO OK CON LA PROMESA ' + data);
    }
      
    ).catch((error)=>{
      console.log('esto es un error ' + error);
    })
   
    //sendAction(senderID, action);
    // Si en el evento existe un mensaje de tipo texto
    if(message.text){
        // Crear un payload para un simple mensaje de texto
        var response = {
            "text": data
        }
  }
     else {
      var response = {
        "text": data
    }
        console.log("creo que tenemos un error");
    }
    
    
    // Enviamos el mensaje mediante SendAPI
  
    
    sendText.enviar_texto(senderID, response);
  };

  module.exports = {process_event};