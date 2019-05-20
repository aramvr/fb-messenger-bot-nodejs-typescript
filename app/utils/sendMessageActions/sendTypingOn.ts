import { callSendAPI } from '../callSendAPI';

/*
 * Turn typing indicator on
 *
 */
export default function sendTypingOn(recipientId: string) {
  console.log('Turning typing indicator on');

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'typing_on'
  };

  callSendAPI(messageData);
}
