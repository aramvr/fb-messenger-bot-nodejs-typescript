import { callSendAPI } from '../callSendAPI';
import { SERVER_URL } from '../../config';

/*
 * Send a Gif using the Send API.
 *
 */
export default function sendGifMessage(recipientId: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'image',
        payload: {
          url: SERVER_URL + '/assets/instagram_logo.gif'
        }
      }
    }
  };

  callSendAPI(messageData);
}
