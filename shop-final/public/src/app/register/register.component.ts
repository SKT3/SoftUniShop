import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /**
   * Register form
   * @type {FormGroup}
   */
  registerForm: FormGroup;

  /**
   * Has request pending
   * @type {boolean}
   */
  loading: boolean = false;

  constructor(private _auth: AuthService,
              private _fb: FormBuilder,
              private _notifications: ToastsManager,
              private _router: Router,
              vcr: ViewContainerRef) {
      //init notifications
      this._notifications.setRootViewContainerRef(vcr);
      //build register form
      this.registerForm = this._fb.group({
          username: ["", Validators.required],
          password: ["", Validators.required]
      });
   }

  ngOnInit() {
  }

  /**
   * Do Registers
   * @param {[type]} event
   */
  register(event): void{
      this.loading = true;
      this._auth.register(this.registerForm.value)
                .subscribe((res) => {
                    this.loading = false;
                    this._notifications.success(
                      'Singup successful!', 'Login to continue');

                     //Redirect to Login after register success
                     setTimeout(() => {
                          this._router.navigate(['/auth/login']);
                     }, 3000);
                }, err => {
                    this.loading = false;
                    this._notifications.error('Singup unsuccessful!', err);
                });
  }

}
