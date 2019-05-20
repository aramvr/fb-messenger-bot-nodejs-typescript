import { callSendAPI } from '../callSendAPI';
import { SERVER_URL } from '../../config';
/*
 * Send audio using the Send API.
 *
 */
export default function sendAudioMessage(recipientId: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: SERVER_URL + "/assets/sample.mp3"
        }
      }
    }
  };

  callSendAPI(messageData);
}