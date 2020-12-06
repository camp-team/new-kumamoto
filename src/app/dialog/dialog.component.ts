import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  deleteAcount() {
    this.userService.deleteUser();
  }
}
