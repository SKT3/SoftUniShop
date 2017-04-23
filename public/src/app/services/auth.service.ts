import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {ReplaySubject, Observable} from 'rxjs/Rx';
import {User} from '../class/user.class';

@Injectable()
export class AuthService {

  /**
   * User object (if authenticated)
   * @type {User}
   */
  _user: User = null;

  /**
   * User Subject for emitting change on _user property
   * @type {ReplaySubject<any>}
   */
  userObs: ReplaySubject<any>;

  constructor(private _http: Http) {
      this.userObs = new ReplaySubject();
  }

  /**
   * Login
   * @param  {{string, string}}          data     User data
   * @return {Observable<any>}          [description]
   */
  login(data: {username: string, password: string}): Observable<any>{
      var params =
      {
          user : {
              username: data.username,
              password: data.password
          }
      };

      return this._http.post('/api/login', params).map(res => {
          let data = res.json();
          this.user = new User(data.user);
          sessionStorage.setItem('user', JSON.stringify(this.user));
          return data;
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Register user
   * @param  {{string, string}}          data     User data
   * @return {Observable<any>}          [description]
   */
  register(data: {username: string, password: string}): Observable<any>{
      var params =
      {
          user : {
              username: data.username,
              password: data.password
          }
      };

      return this._http.post('/api/register', params)
                       .map(res => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Logout current user
   * @return {[type]} [description]
   */
  logout(){
      return this._http.post('/api/logout', '')
                       .map((res: Response) => {
                           let data = res.json();
                           this.user = null;
                           //remove user object from session storage
                           sessionStorage.removeItem('user');
                       })
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  set user(val){
      this._user = val;
      this.userObs.next(this._user);
  }

  get user(){
      return this._user;
  }
  /**
   * Get current user
   * @return {Observable<any>}
   */
  getUser(): Observable<any>{
      return this._http.get('/api/user')
                        .map((res: Response) => {
                             let data =  res.json()
                             this.user = data.user;
                             return data;
                         }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCurrent(){
      return this.userObs;
  }



  /**
   * Check if user is logged in
   * @return {Promise<boolean>} Is logged in
   */
  isLoggedIn(): Promise<boolean>{
      if(this.user !== null){
          return Promise.resolve(true);
      }

      return new Promise((resolve, reject) => {
          let storageUser = sessionStorage.getItem('user');
          console.log('user',storageUser);
          if(storageUser){
            this.user = new User(JSON.parse(storageUser));
            resolve(true);
          }
          else{
            reject(false);
          }

      });
  }
}
