const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://marcomarchionni.github.io/meet'],
  javascript_origins: [
    'https://marcomarchionni.github.io',
    'http://localhost:3000',
  ],
};
const { client_secret, client_id, redirect_uris } = credentials;
const oAuth2Client = new OAuth2(client_id, client_secret, redirect_uris[0]);

/**
 * Show Google log in
 */
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};
