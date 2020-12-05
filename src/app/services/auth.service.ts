import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginProcessing = false;
  uid: string;
  afUser$: Observable<firebase.default.User> = this.afAuth.user;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.afUser$.subscribe((user) => {
      this.uid = user?.uid;
    });
  }

  async login(): Promise<void> {
    this.loginProcessing = true;
    const provider = new firebase.default.auth.GithubAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await this.afAuth.signInWithPopup(provider);
    // return this.userService
    //   .getUserData(this.uid)
    //   .pipe(take(1))
    //   .toPromise()
    //   .then((userDoc) => {
    //     if (!userDoc) {
    //       this.userService
    //         .createUser(this.uid)
    //         .then(() => {
    //           this.snackBar.open('ログインしました。', '閉じる');
    //           this.router.navigateByUrl('/mypage');
    //         })
    //         .catch((error) => {
    //           console.error(error.message);
    //           this.snackBar.open(
    //             'ログインエラーです。数秒後にもう一度お試しください。',
    //             '閉じる'
    //           );
    //         })
    //         .finaly(() => {
    //           this.loginProcessing = false;
    //         });
    //     }
    //   });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました。');
      this.router.navigateByUrl('/');
    });
  }
}
