// Importar las dependencias para configurar el servidor
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var sendText = require('./sendtext');
var processEvent = require('./processevent');

const AssistantV1 = require('ibm-watson/assistant/v1');
//var AssistantV1 = require('ibm-watson/assistant/v1');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// configurar el puerto y el mensaje en caso de exito
app.listen((process.env.PORT || 5000), () => console.log('El servidor webhook esta escchando!'));
// Ruta de la pagina index
app.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa el CMaquera ChatBot :D!!!");
});
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
// Todos eventos de mesenger seran capturados por esta ruta
app.post("/webhook", function (req, res) {
    // Verificar si el evento proviene del pagina asociada
    if (req.body.object == "page") {
        // Si existe multiples entradas entraas
        req.body.entry.forEach(function(entry) {
            // Iterara todos lo eventos capturados
            entry.messaging.forEach(function(event, data) {
                if (event.message) {
                    console.log(event.message);
                    const service = new AssistantV1({
                      version: '2019-02-28',
                      iam_apikey: 'ZWrKTYlOCWc27ZDnjHir2n-LSDcWwU8AQKIT4Wk7KydH',
                      url: 'https://gateway.watsonplatform.net/assistant/api'
                    });
                    
                    service.message({
                      workspace_id: '9d0ddbc8-379f-4fee-bd8f-318181038722',
                      input: {'text': event.message.text}
                      })
                      .then(res => {
                        console.log(JSON.stringify(res, null, 2));
                        res.output.text.forEach(function(data) {
                          console.log('este es el output text '+ data);
                          processEvent.process_event(event, data);
                        })
                      })
                      .catch(err => {
                        console.log(err)
                      });
                    
                }
                else if (event.postback) {
                    handlePostback(event);
                    console.log(event);
                  }
            });
        });
        res.sendStatus(200);
    }
});
// Funcion donde se procesara el evento

  // Enviamos el mensaje mediante SendAPI

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