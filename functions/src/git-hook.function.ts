import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const gitHook = functions.https.onRequest(async (request, response) => {
  const messages = await db.collection('messages').where('ownerGithubId', '==', request.body.sender.id).get();
  messages.docs.forEach((message) => {
    console.log(message.data);
  });
  response.send('success!');
});
