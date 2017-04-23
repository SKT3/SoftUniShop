import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  test(user_id){
      console.log('stefan e gei');
      return this._http.get(`/api/users/${user_id}`).map(res => res.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  login(data){
      var params = {
          user : {
              username: data.username,
              password: data.password
          }
      };
      return this._http.post('/api/login', params).map(res => res.json());
  }
}
