import { Component, OnInit, Input } from '@angular/core';
import { User } from '../class/user.class';
import {AuthService} from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Category } from '../class/category.class';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  /**
   * User reference
   * @type {User}
   */
  user: User;

  @Input() categories: Array<Category>;

  constructor(private _auth: AuthService,
              private _cart: CartService) {
      this._auth.getCurrent().subscribe(user => {
          this.user = user;
      });
  }

  get cartProductsCount(){
      return this._cart.getProductCount();
  }

  initAuth(){
    EmitterService.get('auth.init').emit(true);
  }

  logout(){
      this._auth.logout().subscribe(res => console.log('success'));
  }

  ngOnInit() {
  }

}
