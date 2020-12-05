import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from 'src/app/interfaces/history';
import { AuthService } from 'src/app/services/auth.service';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  githubId: number;
  histories$: Observable<History[]>;

  constructor(
    private authService: AuthService,
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.authService.afUser$.subscribe((user) => {
      this.histories$ = this.historyService.getHistories(+user?.providerData[0].uid);
    });
  }

}
