import config from 'config';
export { default as receivedAuthentication } from './reciveAutentication';
export { default as verifyRequestSignature } from './verifyRequestSignature';
export { default as sendTextMessage } from './sendTextMessage';
export { default as receivedMessageRead } from './receivedMessageRead';
export { default as receivedPostback } from './receivedPostback';
export { default as receivedDeliveryConfirmation } from './receivedDeliveryConfirmation';
export { default as receivedAccountLink } from './receivedAccountLink';
export { default as receivedMessage } from './receivedMessage';

// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken');

export {
  PAGE_ACCESS_TOKEN
}