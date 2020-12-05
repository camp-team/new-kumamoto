import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const gitHook = functions.https.onRequest(async (request, response) => {
  console.log(request.body.sender.id);
  const messageIds: string[] = [];
  await db.collection('messages')
    .where('ownerGithubId', '==', request.body.sender.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((message) => {
        messageIds.push(message.data().messageId);
      });
    });
  console.log(messageIds);
  response.send('success!');
});
