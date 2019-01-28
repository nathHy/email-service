module.exports = {
  mailers: [
    require("./MailGun"),
    require("./SendGrid"),
  ]
};
