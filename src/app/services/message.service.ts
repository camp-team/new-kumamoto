import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../interfaces/message';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  createMessage(messageData: Omit<Message, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    const message: Message = {
      messageId: id,
      createAt: firestore.Timestamp.now(),
      userId: messageData.userId,
      name: messageData.name,
      photoUrl: messageData.photoUrl,
      massage: messageData.massage,
      checked: false,
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
        this.router.navigateByUrl('mypage');
        this.snackBar.open('メッセージを削除しました！', null, {
          duration: 2000,
        });
      });
  }

  getMessages(): Observable<Message[]> {
    return this.db.collection<Message>(`messages`).valueChanges();
  }
}
