import admin from 'firebase-admin'
import * as serviceAccount from '../qrwallet-firebase-adminsdk-nwr99-0ebf16a8f0.json'
// import google from 'google-auth-library'

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}
   
export const adminApp = admin.initializeApp({
    credential: admin.credential.cert(params),
  });

  // export function getAccessToken() {
  //   return new Promise(function(resolve, reject) {
  //     const key = require('../qrwallet-firebase-adminsdk-nwr99-0ebf16a8f0.json');
  //     const jwtClient = new google.auth.JWT(
  //       key.client_email,
  //       null,
  //       key.private_key,
  //       SCOPES,
  //       null
  //     );
  //     jwtClient.authorize(function(err, tokens) {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(tokens.access_token);
  //     });
  //   });
  // }