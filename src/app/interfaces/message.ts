export interface Message {
  messageId: string;
  userId: string;
  name: string;
  photoUrl: string;
  massage: string;
  checked: boolean;
  createAt?: firebase.default.firestore.Timestamp;
}
