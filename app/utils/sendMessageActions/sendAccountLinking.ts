import { callSendAPI } from '../callSendAPI';
import { SERVER_URL } from '../../config';
/*
 * Send a message with the account linking call-to-action
 *
 */
export default function sendAccountLinking(recipientId: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: 'Welcome. Link your account.',
          buttons: [
            {
              type: 'account_link',
              url: SERVER_URL + '/authorize'
            }
          ]
        }
      }
    }
  };

  callSendAPI(messageData);
}
