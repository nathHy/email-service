require('dotenv').config();
const express = require('express');

const app = express();
const sendEmailRouter = require('./sendEmailRouter');

app.use(express.json());
app.use(sendEmailRouter);
app.use((err, req, res, next) => {
  console.log('Error occurred', err);
  // todo change this based on error type
  res.status(500).json({ err: err.message, success: false });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
