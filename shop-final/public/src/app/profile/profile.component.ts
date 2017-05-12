import { Component, OnInit } from '@angular/core';
import { User } from '../class/user.class';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private _auth: AuthService) {

      this._auth.getCurrent().subscribe(user => {
          this.user = user;
          console.log(this.user);
      });
  }

  ngOnInit() {
  }

}
