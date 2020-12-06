import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../interfaces/message';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage
  ) {}

  createMessage(
    githubId: number,
    messageData: Omit<
      Message,
      'messageId' | 'ownerGithubId' | 'createdAt' | 'checked'
    >
  ): Promise<void> {
    const id = this.db.createId();
    const message: Message = {
      messageId: id,
      createdAt: firebase.default.firestore.Timestamp.now(),
      userId: messageData.userId,
      ownerGithubId: githubId,
      name: messageData.name,
      photoUrl: messageData.photoUrl,
      message: messageData.message,
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

  getMessage(id: string): Observable<Message> {
    return this.db.doc<Message>(`messages/${id}`).valueChanges();
  }

  getMessages(userId: string): Observable<Message[]> {
    return this.db
      .collection<Message>('messages', (ref) =>
        ref.where('userId', '==', userId)
      )
      .valueChanges();
  }

  async uploadImage(userId: string, file: File) {
    const result = await this.storage.ref(`messages/${userId}`).put(file);
    const photoUrl = await result.ref.getDownloadURL();

    this.db.doc<Message>(`messages/${userId}`).update({
      photoUrl,
    });
  }
}
