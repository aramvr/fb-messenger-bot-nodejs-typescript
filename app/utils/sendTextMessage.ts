import callSendAPI from './callSendApi';
/*
 * Send a text message using the Send API.
 *
 */
export default function sendTextMessage(recipientId: any, messageText: any) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}
