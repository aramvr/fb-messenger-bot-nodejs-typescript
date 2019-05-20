import { sendTextMessage } from '../sendMessageActions';
import { MessagingEvent } from '../../routes/webHook';

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 *
 */
export default function receivedPostback(event: MessagingEvent) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  console.log(
    "Received postback for user %d and page %d with payload '%s' " + 'at %d',
    senderID,
    recipientID,
    payload,
    timeOfPostback
  );

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  sendTextMessage(senderID, 'Postback called');
}
