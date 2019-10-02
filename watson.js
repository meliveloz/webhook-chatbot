const AssistantV1 = require('ibm-watson/assistant/v1');

function watsonIntegration(event){
  console.log('este es el event.message.text');
  console.log (event.message.text);
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
            return data;
            })
        })
}
module.exports = {watsonIntegration};