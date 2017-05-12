import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {EmitterService} from '../services/emitter.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService,
              private _router: Router){  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    //check if user is logged in
    var loggedIn = this._auth.isLoggedIn().then((res) => {
        return Promise.resolve(true);
    }).catch(err => Promise.reject(false));

    return new Promise((resolve, reject) => {
        loggedIn.then((res) => {
            resolve(true);
        }).catch(err => {
            EmitterService.get('auth.init').emit({redirectTo: 'checkout'});
            reject(false);
        });
    });

  }
}
