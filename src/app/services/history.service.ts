import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { History } from '../interfaces/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private db: AngularFirestore) {}

  getHistories(githubId: number): Observable<History[]> {
    return this.db
      .collection<History>('histories', (ref) =>
        ref.where('ownerGithubId', '==', githubId).orderBy('createdAt')
      )
      .valueChanges();
  }
}
