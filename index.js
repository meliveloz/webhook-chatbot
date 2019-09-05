// Importar las dependencias para configurar el servidor
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// configurar el puerto y el mensaje en caso de exito
app.listen((process.env.PORT || 5000), () => console.log('El servidor webhook esta escchando!'));

// Ruta de la pagina index
app.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa el CMaquera ChatBot :D!!!");
});

// Facebook Webhook

// Usados para la verificacion
app.get("/webhook", function (req, res) {
    // Verificar la coincidendia del token
    if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
        // Mensaje de exito y envio del token requerido
        console.log("webhook verificado!");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        // Mensaje de fallo
        console.error("La verificacion ha fallado, porque los tokens no coinciden");
        res.sendStatus(403);
    }
});

// Todos eventos de mesenger sera apturados por esta ruta
app.post("/webhook", function (req, res) {
    // Verificar si el vento proviene del pagina asociada
    if (req.body.object == "page") {
        // Si existe multiples entradas entraas
        req.body.entry.forEach(function(entry) {
            // Iterara todos lo eventos capturados
            entry.messaging.forEach(function(event) {
                if (event.message) {
                    process_event(event);
                }
            });
        });
        res.sendStatus(200);
    }
});
// Funcion donde se procesara el evento
function process_event(event){
  // Capturamos los datos del que genera el evento y el mensaje 
  var senderID = event.sender.id;
  var message = event.message;

  
  // Si en el evento existe un mensaje de tipo texto
  if(message.text == "Hola"){
      // Crear un payload para un simple mensaje de texto
      var response = {
          "text": 'hola para ti tambien'
      }
  else if (message.text != "Hola") {
    response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Te gusta mi foto??",
              "subtitle": "me considero bastante sexy",
              "image_url": "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/23/0/campaign_images/webdr08/17-times-salem-from-sabrina-summed-up-being-in-yo-2-5045-1435034889-16_dblbig.jpg",
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
      
  } else {
      console.log("creo que tenemos un error");
  }
  
  // Enviamos el mensaje mediante SendAPI
  enviar_texto(senderID, response);
}

// Funcion donde el chat respondera usando SendAPI
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