import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly isLogin = false;
  readonly user = {
    photoURL: 'https://placehold.jp/80x80.png'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
