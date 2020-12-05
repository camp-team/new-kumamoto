import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageCardComponent } from './message-card/message-card.component';
import { CreateMessageDialogComponent } from './create-message-dialog/create-message-dialog.component';
import { DeleteMessageDialogComponent } from './delete-message-dialog/delete-message-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    SettingsComponent,
    MessageListComponent,
    MessageCardComponent,
    CreateMessageDialogComponent,
    DeleteMessageDialogComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, MatIconModule, MatMenuModule],
})
export class SettingsModule {}
