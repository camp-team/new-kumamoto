export interface Message {
  id: string;
  userId: string;
  name: string;
  photoUrl: string;
  massage: string;
  checked: boolean;
  createAt?: firebase.default.firestore.Timestamp;
}
