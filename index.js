const Koa = require("koa");
const app = new Koa();

const { installMailer } = require("./mailer");
const { installRoutes } = require("./routes");
const { installHelpers } = require("./helpers");
const { installQueries } = require("./queries");

const {
  MAILGUN_APIKEY,
  MAILGUN_DOMAIN,
  EMAIL_FROM,
  EMAIL_TO,
  PORT = 3000,
} = process.env;

installMailer(app, {
  mailgun: {
    apiKey: MAILGUN_APIKEY,
    domain: MAILGUN_DOMAIN,
  },
  from: EMAIL_FROM,
  to: EMAIL_TO,
});

installQueries(app);
installHelpers(app);
installRoutes(app);

app.listen(PORT);
