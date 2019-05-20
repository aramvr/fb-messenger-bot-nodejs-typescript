import { callSendAPI } from '../callSendAPI';
import { SERVER_URL } from '../../config';
/*
 * Send a video using the Send API.
 *
 */
export default function sendVideoMessage(recipientId: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
          url: SERVER_URL + "/assets/allofus480.mov"
        }
      }
    }
  };

  callSendAPI(messageData);
}