const API_KEY = process.env.SEND_GRID_API_KEY;
const API_URL = process.env.SEND_GRID_API_URL;

if ([API_KEY, API_URL].includes(undefined)) {
  throw new Error('Missing env vars for mailgun');
}
function generateEmailArrays(emails) {
  if (typeof emails === 'string') emails = [emails];
  return emails.map(email => ({ email }));
}

function generateBody({
  to, from, cc, bcc, body,
}) {
  return {
    from: { email: from },
    personalizations: [{
      subject: 'subject',
      to: generateEmailArrays(to),
      cc: generateEmailArrays(cc),
      bcc: generateEmailArrays(bcc),
    }],
    content: [
      {
        type: 'text/plain',
        value: body,
      },
    ],
  };
}
function getRequestOptions(emailData) {
  // todo add validation for
  // - < 1000 emails
  // - < 30mb body
  const options = {
    url: API_URL,
    method: 'POST',
    body: generateBody(emailData),
    auth: {
      bearer: API_KEY,
    },
    json: true,
  };
  return options;
}

module.exports = {
  clientName: 'sendgrid',
  getRequestOptions,
  validResponseCodes: [202],
};
