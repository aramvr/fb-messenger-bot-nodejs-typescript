import crypto from 'crypto';
import config from 'config';
import request from 'request';

// App Secret can be retrieved from the App Dashboard
const APP_SECRET: string = config.get('appSecret');

export default function verifyRequestSignature(req: any, res: any, buf: any) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', APP_SECRET)
      .update(buf)
      .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}