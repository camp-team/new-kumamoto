export interface Message {
  messageId: string;
  userId: string;
  ownerGithubId: number;
  name: string;
  photoUrl: string;
  message: string;
  createdAt: firebase.default.firestore.Timestamp;
}
