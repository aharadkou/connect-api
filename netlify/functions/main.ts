import { Handler } from '@netlify/functions';
import base64url from 'base64url';
import { MailSlurp } from "mailslurp-client";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `${event.httpMethod} isn't supported` })
    }    
  }

  if (process.env.QR_CODE_URL !== base64url.decode(<string>event?.headers?.token)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Authentication token isn't provided or invalid" })
    }
  }

  const body = JSON.parse(event.body || '{}');
  if (!body.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email message isn't provided" })
    }    
  }

  const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY || '' });
  const inbox = await mailslurp.getInbox(process.env.MAILSLURP_INBOX_ID || '');
  await mailslurp.sendEmail(inbox.id, {
    toContacts: [process.env.PERSONAL_EMAIL || ''],
    subject: 'Message from mailslurp',
    body: `${base64url.decode(body.message)} from ${event.headers['x-nf-client-connection-ip']}`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email has been sent sucessfully. Wait for the reply)' }),
  };
};
