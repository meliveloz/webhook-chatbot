function process_event(event){
    // Capturamos los datos del que genera el evento y el mensaje 
    var senderID = event.sender.id;
    var message = event.message;
      
    //sendAction(senderID, action);
    // Si en el evento existe un mensaje de tipo texto
    if(message.text == "Hola"){
        // Crear un payload para un simple mensaje de texto
        var response = {
            "text": 'hola para ti tambien'
        }
  }
  else if (message.text == "Chao"){
      response = { 
            "text": "Me vas a abandonar?:",
            "quick_replies":[
              {
                "content_type":"text",
                "title":"SI",
                "payload":"SI" 
              },{
                "content_type":"text",
                "title":"NO",
                "payload":"NO"
              }
            ]
          
        }  
      }
    else if (message.text != "Hola") {
      response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": "Te gusta como me veo?",
                "subtitle": "click en tu respuesta",
                "image_url": "https://pbs.twimg.com/media/DAMDnjHUMAUcOqN.jpg:large",
                "buttons": [
                  {
                    "type": "postback",
                    "title": "Yes!",
                    "payload": "yes",
                  },
                  {
                    "type": "postback",
                    "title": "No!",
                    "payload": "no",
                  }
                ],
              }]
            }
          }
        }
      } 
        
     else {
        console.log("creo que tenemos un error");
    }

    module.exports = {process_event};