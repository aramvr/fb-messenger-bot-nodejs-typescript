import { callSendAPI } from '../callSendAPI';
/*
 * Send an image using the Send API.
 *
 */
export default function sendImageMessage(recipientId: string, imagePath: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: imagePath
        }
      }
    }
  };

  callSendAPI(messageData);
}
