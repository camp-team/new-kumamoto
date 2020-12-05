import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginProcessing = false;
  uid: string;
  githubId: number;
  afUser$: Observable<firebase.default.User> = this.afAuth.user;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private messageService: MessageService
  ) {
    this.afUser$.subscribe((user) => {
      this.githubId = +user?.providerData[0].uid;
      this.uid = user?.uid;
    });
  }

  async login(): Promise<void> {
    this.loginProcessing = true;
    const provider = new firebase.default.auth.GithubAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await this.afAuth.signInWithPopup(provider);
    const { user } = userCredential;
    return this.messageService
      .getMessages(user.uid)
      .pipe(take(1))
      .toPromise()
      .then((messages) => {
        if (messages.length === 0) {
          const initialMessage = {
            userId: this.uid,
            name: 'GitCheer運営',
            photoUrl: '',
            massage: 'お疲れ様でした！いい感じですね。',
          };
          this.messageService.createMessage(this.githubId, initialMessage);
        }
        this.snackBar.open('ログインしました。', '閉じる');
        this.router.navigateByUrl('/mypage');
      })
      .catch((error) => {
        console.error(error.message);
        this.snackBar.open(
          'ログインエラーです。数秒後にもう一度お試しください。',
          '閉じる'
        );
      })
      .finally(() => {
        this.loginProcessing = false;
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました。');
      this.router.navigateByUrl('/');
    });
  }
}
