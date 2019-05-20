import { callSendAPI } from '../callSendAPI';

/*
 * Turn typing indicator off
 *
 */
export default function sendTypingOff(recipientId: string) {
  console.log('Turning typing indicator off');

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_off'
  };

  callSendAPI(messageData);
}
