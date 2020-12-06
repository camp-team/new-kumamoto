import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uid: string;
  user$ = this.auth.afUser$;

  constructor(
    private fns: AngularFireFunctions,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

  getUserWithSnapShot() {
    return this.user$.pipe(first()).toPromise();
  }

  async deleteUser() {
    const callable = this.fns.httpsCallable('deleteAfUser');
    const user = await this.getUserWithSnapShot();

    return callable(user)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl('/');
        this.snackBar.open('ご利用ありがとうございました');
      });
  }
}
