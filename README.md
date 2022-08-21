# Jeep Tracker

A server with a single endpoint that will pull tracking information for a Jeep customer order, and send it to a specified email.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

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

Send a post request with a VON and a Last Name:

```
POST http://localhost:3000/tracking-email/12345678/Smith
```

and the tracking information with that customer order will be pulled and sent to the email specified in the `EMAIL_TO` environment variable
