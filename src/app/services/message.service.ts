import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../interfaces/message';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  createMessage(githubId: number, messageData: Omit<Message, 'messageId' | 'ownerGithubId' | 'createdAt' | 'checked'>): Promise<void> {
    const id = this.db.createId();
    const message: Message = {
      messageId: id,
      createAt: firebase.default.firestore.Timestamp.now(),
      userId: messageData.userId,
      ownerGithubId: githubId,
      name: messageData.name,
      photoUrl: messageData.photoUrl,
      massage: messageData.massage,
    };
    return this.db.doc<Message>(`messages/${id}`).set(message);
  }

  updateMessage(message: Message): Promise<void> {
    return this.db.doc(`messages/${message.messageId}`).update(message);
  }

  deleteMessage(messageId: string): Promise<void> {
    return this.db
      .doc<Message>(`messages/${messageId}`)
      .delete()
      .then(() => {
        this.snackBar.open('メッセージを削除しました！');
      });
  }

  getMessages(userId: string): Observable<Message[]> {
    return this.db
      .collection<Message>('messages', (ref) => ref.where('userId', '==', userId))
      .valueChanges();
  }
}
