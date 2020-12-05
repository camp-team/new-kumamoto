import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { MypageComponent } from './mypage/mypage.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryCardComponent } from './history-card/history-card.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MypageComponent, HistoryListComponent, HistoryCardComponent],
  imports: [CommonModule, MypageRoutingModule, MatDialogModule],
})
export class MypageModule {}
