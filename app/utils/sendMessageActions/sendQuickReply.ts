import { callSendAPI } from '../callSendAPI';
/*
 * Send a message with Quick Reply buttons.
 *
 */
export default function sendQuickReply(recipientId: string) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          content_type: 'text',
          title: 'Action',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION'
        },
        {
          content_type: 'text',
          title: 'Comedy',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY'
        },
        {
          content_type: 'text',
          title: 'Drama',
          payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA'
        }
      ]
    }
  };

  callSendAPI(messageData);
}
