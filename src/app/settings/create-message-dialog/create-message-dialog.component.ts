import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/interfaces/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrls: ['./create-message-dialog.component.scss'],
})
export class CreateMessageDialogComponent implements OnInit {
  @Input()
  file: File;

  githubId$ = this.messageSerivce.getMessage(this.data.userId);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    text: ['', [Validators.required, Validators.maxLength(50)]],
  });

  constructor(
    private fb: FormBuilder,
    private messageSerivce: MessageService,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    private data: { userId: string }
  ) {}

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  submit(githubId): Promise<void> {
    const ownerGithubId = githubId;
    const value = this.form.value;
    const id = this.db.createId();
    const formData: Omit<
      Message,
      'messageId' | 'ownerGithubId' | 'createdAt' | 'checked'
    > = {
      userId: id,
      name: value.name,
      photoUrl: value.photoUrl,
      message: value.message,
    };
    return this.messageSerivce.createMessage(githubId, formData).then(() => {
      this.snackBar.open('作成しました！', null, {
        duration: 2000,
      });
    });
  }

  uploadImage(event) {
    if (event.target.files.length) {
      const image = event.target.files[0];
      this.messageSerivce.uploadImage(this.data.userId, image);
    }
  }

  ngOnInit(): void {
    console.log(this.data.userId);
  }
}
