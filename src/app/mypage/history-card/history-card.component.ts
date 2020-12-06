import { Component, Input, OnInit } from '@angular/core';
import { HistoryWithMessage } from 'src/app/interfaces/history';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss'],
})
export class HistoryCardComponent implements OnInit {
  @Input() message: HistoryWithMessage;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
