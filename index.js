const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')

const axios = require('axios').default
const Email = require('email-templates');
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

const {
  MAILGUN_APIKEY,
  MAILGUN_DOMAIN,
  EMAIL_FROM,
  EMAIL_TO
} = process.env

const transport = nodemailer.createTransport(mg({
  auth: {
    api_key: MAILGUN_APIKEY,
    domain: MAILGUN_DOMAIN
  }
}))

const email = new Email({
  message: {
    from: EMAIL_FROM
  },
  transport
});

const router = new Router()
router.post('/tracking-email/:von/:lastName', async (ctx) => {
  const { von, lastName } = ctx.params
  const { data } = await axios.get(`https://www.jeep.com/hostz/cots/order-status/${von}/${lastName}`)
  const { orderstatus, vinDetails } = data
  const yStatuses = orderstatus.filter((status) => status.currentStatus === status.display)
  const { statusCode, statusDesc, statusUpdateDate } = yStatuses.pop()
  const { brandName, modelYear, modelName, image, vin } = vinDetails
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
    von
  }
  await email.send({
    template: 'jeep-tracking',
    message: {
      to: EMAIL_TO
    },
    locals
  })

  ctx.body = { success: true }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)