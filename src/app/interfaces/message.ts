export interface Message {
  messageId: string;
  userId: string;
  ownerGithubId: number;
  name: string;
  photoUrl: string;
  message: string;
  checked: boolean;
  createAt?: firebase.default.firestore.Timestamp;
}
