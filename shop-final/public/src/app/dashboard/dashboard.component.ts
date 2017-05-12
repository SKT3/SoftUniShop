import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService} from '../services/auth.service';
import { User } from '../class/user.class';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  users: Array<User> = [];

  constructor(private _userService: UserService,
              private _auth: AuthService) {
    this._auth.getCurrent().subscribe(user => {
      this.user = user;
      if(this.user.is('admin'))
          this._userService.getAll().subscribe(res => {
            for(let user of res.data){
              this.users.push(new User(user));

            }
            console.log(this.users);
          });
    });
  }

  delete(id){
    this._userService.delete(id).subscribe(res => {
      let index = this.users.map(u => u.id).indexOf(id);
      if(index !== -1)
        this.users.splice(index, 1);
    });
  }

  ngOnInit() {
  }

}
