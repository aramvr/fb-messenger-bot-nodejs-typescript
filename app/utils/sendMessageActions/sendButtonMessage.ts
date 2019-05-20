import { callSendAPI } from '../callSendAPI';
/*
 * Send a button message using the Send API.
 *
 */
export default function sendButtonMessage(recipientId: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'This is test text',
          buttons: [
            {
              type: 'web_url',
              url: 'https://www.oculus.com/en-us/rift/',
              title: 'Open Web URL'
            },
            {
              type: 'postback',
              title: 'Trigger Postback',
              payload: 'DEVELOPER_DEFINED_PAYLOAD'
            },
            {
              type: 'phone_number',
              title: 'Call Phone Number',
              payload: '+16505551234'
            }
          ]
        }
      }
    }
  };

  callSendAPI(messageData);
}
