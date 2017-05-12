import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {User} from '../class/user.class';
import {Cart} from '../class/cart.class';
import {AuthService} from '../services/auth.service';
import {CartService} from '../services/cart.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr'

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: User;

  cart: Cart;

  loading: boolean = false;

  completed: boolean = false;

  constructor(private _auth: AuthService,
              private _cartService: CartService,
              private _notifications: ToastsManager,
              vcr: ViewContainerRef) {
    this._notifications.setRootViewContainerRef(vcr);
    this._auth.getCurrent().subscribe(user => this.user = user);
    this._cartService.get().subscribe(cart => this.cart = cart);
  }

  ngOnInit() {
  }

  finalize(){
    if(this.completed)
      return;
    this.loading = true;
    setTimeout(() => {
      try{
        this.canPay();

        this._cartService.checkout().subscribe((res) => {
          this.loading = false;
          this._notifications.success('Success', 'Purchase successful! You can review your oder under "Your orders section"');
        });

        this.loading = false;
        this.completed = true;
      }catch(e){
        this._notifications.error(e.message, 'Error');
        this.loading = false;
      }
    }, 2000);
  }

  private canPay(){
    var price = this.cart.hasDiscount ? this.cart.totalPriceDiscount : this.cart.totalPrice;
    if(!this.user.hasEnoughMoney(price))
      throw new Error('You do not have enough money balance to finilize the purchase!');
  }

}
