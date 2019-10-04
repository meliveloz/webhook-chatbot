var request = require('request');
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


module.exports = {sendAction};