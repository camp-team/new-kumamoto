import { Message } from './message';

export interface History {
  id: string;
  messageId: string;
  ownerGithubId: number;
  createdAt: firebase.default.firestore.Timestamp;
  checked: boolean;
}

export interface HistoryWithMessage extends History {
  message: Message;
}
