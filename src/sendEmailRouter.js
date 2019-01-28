const express = require('express');
const Mailer = require('./Mailer');
const _ = require('lodash');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
const requestSchema = require('./schemas/mailSchema');
const Router = express.Router();

const validateData = (req, res, next) => {
  const test = ajv.compile(requestSchema);
  const validData = test(req.body);
  if (validData) {
    next();
  } else {
    next(new Error('Invalid or missing request properties'));
  }
};

const sendMailMiddleware = async (req, res, next) => {
  const emailData = _.pick(req.body, ['from', 'to', 'cc', 'bcc', 'body']);
  const mailSent = await Mailer.sendEmail(emailData);
  if (mailSent) {
    res.json({
      success: true
    });
  } else {
    throw new Error('Failed to send mail');
  }
};

Router.post('/mail', [validateData, sendMailMiddleware]);

module.exports = Router;
