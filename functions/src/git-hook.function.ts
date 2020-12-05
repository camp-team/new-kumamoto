import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const gitHook = functions.https.onRequest(async (request, response) => {
  const ownerGithubId: string = request.body.sender.id;
  const messageIds: string[] = [];
  await db.collection('messages')
    .where('ownerGithubId', '==', ownerGithubId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((message) => {
        messageIds.push(message.data().messageId);
      });
    });

  const serectedMessage = messageIds[Math.floor(Math.random() * messageIds.length)];
  const id = db.collection('_').doc().id;
  const historyData = {
    id,
    messageId: serectedMessage,
    ownerGithubId,
    createdAt: new Date(),
    checked: false,
  };
  await db.doc(`histories/${id}`).set(historyData);
  response.send('success!');
});
