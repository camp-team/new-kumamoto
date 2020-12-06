import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  combineLatest,
  CombineLatestOperator,
} from 'rxjs/internal/observable/combineLatest';
import { map, switchMap } from 'rxjs/operators';
import { History, HistoryWithMessage } from 'src/app/interfaces/history';
import { Message } from 'src/app/interfaces/message';
import { AuthService } from 'src/app/services/auth.service';
import { HistoryService } from 'src/app/services/history.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit {
  githubId: number;
  histories$: Observable<History[]>;
  messages$: Observable<HistoryWithMessage[]>;

  constructor(
    private authService: AuthService,
    private historyService: HistoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.afUser$.subscribe((user) => {
      this.histories$ = this.historyService.getHistories(
        +user?.providerData[0].uid
      );
      this.messages$ = this.histories$.pipe(
        switchMap((docs: History[]) => {
          const messageObservables: Observable<Message>[] = docs.map((doc) => {
            return this.messageService.getMessage(doc.messageId);
          });
          const messages$ = combineLatest(messageObservables);
          return combineLatest([of(docs), messages$]);
        }),
        map(([histories, messages]) => {
          return histories.map((history) => {
            return {
              ...history,
              message: messages.find(
                (message) => history.messageId === message.messageId
              ),
            };
          });
        })
      );
    });
  }
}
