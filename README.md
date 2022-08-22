# Jeep Tracker

A server with a single endpoint that will pull tracking information for a Jeep customer order, and send it to a specified email. It aggregates data from the official Jeep tracker, and the build sheet and window sticker servelets.

## Requirements

Node 16+

## Environment Variables

To run this project, you will need to set the following environment variables

`MAILGUN_APIKEY`

`MAILGUN_DOMAIN`

`EMAIL_FROM`

`EMAIL_TO`

## Installation

Install dependencies with npm and run the server

```bash
  $ npm install
  $ npm run start
```

By default, the server will run on port 3000.

## Demo

### Send an email with tracking data

> POST /tracking-email/:von/:lastName

```
$ curl -X POST \
  http://localhost:3000/tracking-email/12345678/Smith
{"success":true}
```

and the tracking information with that customer order will be pulled and sent to the email specified in the `EMAIL_TO` environment variable

#### Get tracking data in JSON format:

> GET /tracking/:von/:lastName

```
$ curl -X GET \
  http://localhost:3000/tracking/12345678/Smith
{"success":true}
{
  "statusCode": "D1",
  "statusDesc": "Scheduled",
  "statusUpdateDate": "2022-06-29",
  "brandName": "JEEP",
  "modelYear": "2023",
  "modelName": "WRANGLER 4-D00R SPORT 4WD",
  "vehicle": "2023 WRANGLER 4-D00R SPORT 4WD",
  "image": "https://www.jeep.com/mediaserver/iris?client=FCAUS&market=U&brand=J&vehicle=2023_JL&paint=PSE&fabric=X9&sa=JLJL74,2TW,23W,3V1,4AJ,4EA,4H4,4NU,4UQ,573,5N6,875P,894P,AAN,ACBP,ADAP,AJ1,BC1P,CS2P,CWAP,DBB,DEM,DSAP,ERC,GCDP,GFAP,GNCP,GTBP,GXDP,GXMP,HABP,HT1,JAJP,JHBP,JJ2P,JLPP,JMAP,JPHP,JPYP,LAYP,LMGP,LNVP,LPXP,LSAP,MBCP,MBUP,MDAP,MEFP,MS3P,MT6P,MW7P,NAS,NHAP,NZBP,R08P,RAA,RF5P,RF7P,RFJP,RFPP,RSDP,RTFP,SCJP,ST8P,TTPP,TZBP,WJPP,WLZ,X9BP,X9HP,XAAP,XANP,XHZP,XJGP,XRBP,YGN,ZBCP,ZBUP,ZPDP,ZPVP&pov=fronthero&width=714&height=300&bkgnd=transparent&resp=png",
  "vin": "1234567890W500120",
  "von": "12345678",
  "buildSheetFound": false,
  "buildSheetFoundMsg": "b.s. 0",
  "buildSheetUrl": "https://www.jeep.com/webselfservice/BuildSheetServlet?vin=1234567890W500120",
  "windowStickerFound": false,
  "windowStickerFoundMsg": "w.s. 0",
  "windowStickerUrl": "https://www.jeep.com/hostd/windowsticker/getWindowStickerPdf.do?vin=1234567890W500120"
}
```

## Development

You can run a development server like so:

```
$ npm run dev
```

The `dev` script utilizes a `.env` file to load environment variables. To take advantange of this, create a `.env` file with the following contents:

```
EMAIL_FROM=Jeep Tracker <jeep-tracker@example.com>
EMAIL_TO=<your email here>
```

MAILGUN_API_KEY and MAILGUN_DOMAIN aren't necessary for the dev server as web previews of the email will be shown instead of being sent.
