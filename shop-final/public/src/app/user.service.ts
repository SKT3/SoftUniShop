import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  getAll(){
    return this._http.get('/api/users').map(res => res.json());
  }

  delete(id: number){
      return this._http.delete(`/api/user/${id}`).map(res => res.json());
  }
}
