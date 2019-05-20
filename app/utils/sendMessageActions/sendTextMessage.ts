import { callSendAPI } from '../callSendAPI';
import { MessageData } from '../callSendAPI/callSendAPI';
/*
 * Send a text message using the Send API.
 *
 */
export default function sendTextMessage(recipientId: string, messageText: string) {
  var messageData: MessageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: 'DEVELOPER_DEFINED_METADATA'
    }
  };

  callSendAPI(messageData);
}
