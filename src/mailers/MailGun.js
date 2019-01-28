const API_USER = process.env.MAIL_GUN_API_USER;
const API_KEY = process.env.MAIL_GUN_API_KEY;
const API_URL = process.env.MAIL_GUN_API_URL;

if ([API_USER, API_KEY, API_URL].includes(undefined)) {
  throw new Error('Missing env vars for mailgun');
}

function generateEmailString(emails) {
  if (typeof emails === 'string') {
    emails = [emails];
  }
  if (!Array.isArray(emails)) {
    throw new Error('Invalid email input');
  }
  return emails.join(',');
}

// https://documentation.mailgun.com/en/latest/api-intro.html#authentication
// https://github.com/request/request#http-authentication
function generateUrl(user, key, url) {
  user = user.trim();
  key = key.trim();
  url = url.trim();
  return `https://${user}:${key}@${url}/messages`;
}

function getRequestOptions({
  to, from, cc, bcc, body,
}) {
  const form = {
    from,
    to: generateEmailString(to),
    cc: generateEmailString(cc),
    bcc: generateEmailString(bcc),
    text: body,
  };

  return {
    url: generateUrl(API_USER, API_KEY, API_URL),
    method: 'POST',
    form,
  };
}

module.exports = {
  clientName: 'mailgun',
  getRequestOptions,
  validResponseCodes: [200],
};
