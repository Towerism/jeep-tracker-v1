const Koa = require("koa");
const app = new Koa();
const Router = require("@koa/router");

const axios = require("axios").default;
const { installMailer } = require("./mailer");

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

const router = new Router();
router.post("/tracking-email/:von/:lastName", async (ctx) => {
  const { von, lastName } = ctx.params;
  const { data } = await axios.get(
    `https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`
  );
  const { orderstatus, vinDetails } = data;
  const yStatuses = orderstatus.filter(
    (status) => status.currentStatus === status.display
  );
  const { statusCode, statusDesc, statusUpdateDate } = yStatuses.pop();
  const { brandName, modelYear, modelName, image, vin } = vinDetails;
  const locals = {
    statusCode,
    statusDesc,
    statusUpdateDate,
    brandName,
    modelYear,
    modelName,
    vehicle: `${modelYear} ${modelName}`,
    image: `${image}&width=714&height=300&bkgnd=transparent&resp=png`,
    vin,
    von,
  };
  await ctx.email.send({
    template: "jeep-tracking",
    locals,
  });

  ctx.body = { success: true };
});

router.get("/", (ctx) => {
  ctx.body = { path: "/" };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
