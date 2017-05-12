import { Component, OnInit, ViewContainerRef,Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../class/user.class';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  /**
   * Login Form
   * @type {FormGroup}
   */
  private loginForm: FormGroup;

  /**
   * User object after successful login
   * @type {User}
   */
  private user: User;
  /**
   * Has request pending
   * @type {boolean}
   */
  private loading: boolean = false;

  @Input() redirectTo: string;

  @Output() dismiss = new EventEmitter<any>();

  constructor(private _auth: AuthService,
              private _router: Router,
              private _notifications: ToastsManager,
              private _fb: FormBuilder,
              private _logger: LoggerService,
              vcr: ViewContainerRef)
  {
      //init notification
      this._notifications.setRootViewContainerRef(vcr);
      //build login form
      this.loginForm = this._fb.group({
          username: ["", Validators.required],
          password: ["", Validators.required]
      });
  }

  ngOnInit() {

  }

  /**
   * Do Login
   * @param  {[type]} event
   * @return {void}
   */
  login(event): void{
      this.loading = true;
      this._auth.login(this.loginForm.value).subscribe(res => {
          this.user = new User(res.user);
          this.loading = false;
          //log event
          this._logger.log(this.user, '[Login] Successful Login:');
          this._notifications.success('Successful login!', this.user.email);
          //Redirect after successful login
          if(this.redirectTo){
            setTimeout(() => {this._router.navigate([`/${this.redirectTo}`]);},2500);
          }
           setTimeout(() => {
                this.close();
           }, 2000);

      }, err => {
          this.loading = false;
          this._notifications.error('Unsuccessful login!', err);
      });
  }

  close(){
    this.dismiss.emit(true);
  }

}
