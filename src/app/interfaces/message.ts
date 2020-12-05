export interface Message {
  messageId: string;
  userId: string;
  ownerGithubId: number;
  name: string;
  photoUrl: string;
  massage: string;
  createAt?: firebase.default.firestore.Timestamp;
}
