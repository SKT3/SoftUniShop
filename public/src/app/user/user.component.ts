import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';

import { User } from '../class/user.class';
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }
}
