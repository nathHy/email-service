# Email-service

## What is this

This repo contains a sample service to send emails. It uses both sendgrid and mailgun as the mail servers. It will first attempt to use mailgun, if that fails it will fallback to sendgrid automatically.

## Setup

1. Clone the repo
2. Run `npm i`
3. Add a `.env` file with the following vars filled out
```.env
SEND_GRID_API_URL
SEND_GRID_API_KEY
MAIL_GUN_API_URL
MAIL_GUN_API_KEY
MAIL_GUN_API_USER
```
4. Run `node src/app.js`

## Todo

- Validation on email provider specific validations. EG total email limit, body size etc
- Add better error handling. Provide a way to propogate user errors and hide system errors
- Add unit tests
  - jest with coverage reports
- Update mailers
  - Make more generic
  - Typescript would help enforce exports
- Add a proper logger