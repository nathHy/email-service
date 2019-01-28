const request = require('request-promise-native');
const { mailers } = require('./mailers');

class Mailer {
  constructor({ clientName, getRequestOptions, validResponseCodes }) {
    this.getRequestOptions = getRequestOptions;
    this.validResponseCodes = validResponseCodes;
    this.clientName = clientName;
    console.log(`Created client ${clientName}`);
  }

  static async sendEmail(data) {
    for (const mailerDetails of mailers) {
      try {
        const client = new Mailer(mailerDetails);
        const sent = await client.send(data);
        if (sent) return sent;
        console.log('failed to send, trying other clients');
      } catch (error) {
        // handle client error codes
        console.log('ERROR:', error.message);
      }
      return false;
    }
  }

  async send(data) {
    const request = this.generateRequest(data);
    const response = await request;
    console.log('code:', response.statusCode);
    console.log('body', response.body);
    return this.validResponseCodes.includes(response.statusCode);
  }

  generateRequest(data) {
    const mailerOptions = this.getRequestOptions(data);
    const options = {
      ...mailerOptions,
      resolveWithFullResponse: true,
    };
    console.log('sending request with', options);
    return request(options);
  }
}
module.exports = Mailer;
