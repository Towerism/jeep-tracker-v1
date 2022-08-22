const Email = require("email-templates");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

exports.installMailer = (app, { mailgun: { apiKey, domain }, from, to }) => {
  const transport = nodemailer.createTransport(
    mg({
      auth: {
        api_key: apiKey,
        domain,
      },
    })
  );
  const email = new Email({
    message: {
      from,
      to,
    },
    transport,
  });
  app.context.email = email;
};
