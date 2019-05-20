import { MessagingEvent } from '../../routes/webHook';
/*
 * Account Link Event
 *
 * This event is called when the Link Account or UnLink Account action has been
 * tapped.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 *
 */
export default function receivedAccountLink(event: MessagingEvent) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  console.log(
    'Received account link event with for user %d with status %s ' +
      'and auth code %s ',
    senderID,
    status,
    authCode
  );
}
