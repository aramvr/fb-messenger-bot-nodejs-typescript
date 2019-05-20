import express from 'express';
import { VALIDATION_TOKEN } from '../config';
const router: express.Router = express.Router();

import {
  receivedDeliveryConfirmation,
  receivedMessage,
  receivedMessageRead,
  receivedAccountLink,
  receivedPostback
} from '../utils/receivedMessageActions';

import { receivedAuthentication } from '../utils/receivedMessageActions';

/*
 * Use your own validation token. Check that the token used in the Webhook
 * setup is the same token used here.
 *
 */
router.get('/', function(req, res) {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === VALIDATION_TOKEN
  ) {
    console.log('Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page.
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */


interface MessagingReferral {
  source: string;
  type: string;
  ref: string;
  referer_uri: string;
}
interface MessagingPostback {
  title: string;
  payload: string;
  referral: MessagingReferral;
}
interface MessagingPostback {
  title: string;
  payload:string;
  referral: MessagingReferral;
 }

interface MessagingDelivery {
  mids: string[];
  watermark: number;
  seq?: number;
}
export interface MessagingEvent {
  message: {
    is_echo: boolean;
    app_id: string;
    metadata: string;
    mid: string;
    text: string;
    attachments: MessageAttachment;
    quick_reply: MessageQuick_Reply;
  };
  delivery: MessagingDelivery;
  postback: MessagingPostback;
  read: {
    watermark: number;
    seq?: number;
  }
  optin: {
    ref: string;
    user_ref: string;
  };
  account_linking: {
    status: 'linked' | 'unlinked',
    authorization_code: string;
  };
  sender: {
    id: string;
  }
  recipient: {
    id: string;
  };
  timestamp: string;
}
interface PageEntry {
  id: string;
  time: string;
  messaging: [];
}
interface MessagesSender {
  id: string;
}
interface MessagesRecipient {
  id: string;
}
interface MessageAttachment {
  type: string;
  payload: string;
}
interface MessageQuick_Reply {
  payload: string;
}
interface Message {
  mid: string;
  text: string;
  attachments: Array<MessageAttachment>;
  quick_reply: MessageQuick_Reply;
}
router.post('/', function(req: express.Request, res: express.Response) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry: PageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent: MessagingEvent) {
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else if (messagingEvent.read) {
          receivedMessageRead(messagingEvent);
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent);
        } else {
          console.log(
            'Webhook received unknown messagingEvent: ',
            messagingEvent
          );
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});

export default router;
