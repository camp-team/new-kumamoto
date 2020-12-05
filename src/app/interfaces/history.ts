export interface History {
  id: string;
  messageId: string;
  ownerGithubId: number;
  createdAt: firebase.default.firestore.Timestamp;
  checked: boolean;
}
