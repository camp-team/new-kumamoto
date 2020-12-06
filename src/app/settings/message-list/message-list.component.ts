import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Message } from 'src/app/interfaces/message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  userId: string;
  user$ = this.authService.afUser$;
  message$: Observable<Message[]>;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.afUser$.subscribe((user) => {
      this.userId = user?.uid;
      this.message$ = this.messageService.getMessages(this.userId);
    });
  }
}
