import { Component, OnInit, Input } from '@angular/core';
import { EmitterService } from '../services/emitter.service';
declare var jQuery : any;

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  /**
   * Auth action (Login/Signup)
   * @type {string} [description]
   */
  action: string = 'login';

  redirectAfterSuccess;
  constructor() { }

  ngOnInit() {
    EmitterService.get('auth.init').subscribe(init => {
        if(init.redirectTo)
          this.redirectAfterSuccess = init.redirectTo;

        console.log(init);
        this.init()
    });
  }

  close(val){
    jQuery('#auth-modal').modal('hide');
  }

  init(){
      jQuery('#auth-modal').modal('show');
  }
}
