
import request from 'request';
import { PAGE_ACCESS_TOKEN } from '../../config';

export interface MessageData {
  messaging_type?: string;
  recipient: {
    id: string;
  };
  message: {};
  sender_action?: string;
  notification_type?: string;
  tag?: string;
}
interface SendMessageBody {
  recipient_id: string;
  message_id: string;
  error: string;
}
/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
export default function callSendAPI(messageData: MessageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error: any, response: request.Response, body: SendMessageBody) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s",
          messageId, recipientId);
      } else {
        console.log("Successfully called Send API for recipient %s",
          recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}