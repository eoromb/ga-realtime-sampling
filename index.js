'use strict';

const { google } = require('googleapis');

const key = require('./key.json');
const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const jwt = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes
);
const view_id = '211956036';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './key.json';
const metric = 'rt:activeUsers';

function getMetric() {
  return new Promise((resolve, reject) => {
    google.analytics('v3').data.realtime.get(
      {
        auth: jwt,
        ids: 'ga:' + view_id,
        metrics: metric
      },
      (error, result) => {
        if (error) {
          console.log(`error: `, error);
          return;
        }
        if (result.status != 200) {
          console.log(`Incorrect status: ${result.status}`);
          return;
        }
        console.log(result.data.totalsForAllResults[metric]);
        resolve();
      }
    );
  });
}
async function timeoutFn() {
  try {
    await getMetric();
  } catch {}
  setTimeout(timeoutFn, 1000);
}
jwt.authorize((error, response) => {
  if (error) {
    console.log(error);
  } else {
    setTimeout(timeoutFn, 1000);
  }
});
