import { callSendAPI } from '../callSendAPI';

/*
 * Send a read receipt to indicate the message has been read
 *
 */
export default function sendReadReceipt(recipientId: string) {
  console.log('Sending a read receipt to mark message as seen');

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'mark_seen'
  };

  callSendAPI(messageData);
}
