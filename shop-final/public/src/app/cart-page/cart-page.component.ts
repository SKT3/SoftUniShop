import { Component, OnInit, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';
import {Router, Route, ActivatedRoute} from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../class/cart.class';
import { Product } from '../class/product.class';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {EmitterService} from '../services/emitter.service';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart : Cart;

  constructor(private _cartService: CartService,
              private _notifications: ToastsManager,
              private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
                    vcr: ViewContainerRef) {
     this._notifications.setRootViewContainerRef(vcr);

      this._cartService.get().subscribe(cart => {
          this.cart = cart;
      });
  }

  changeQuantity( event, product: Product){
      console.log(product);
         console.log(event.target.value);

     this._cartService.changeQuantity(product, event.target.value).subscribe(res => {},
            error => {
                console.log(error);
    });
  }

  removeProduct(product: Product){
      this._cartService.removeProduct(product).subscribe((res) => {
          this._notifications.success(product.name, 'Successfully removed from cart!');
      });
  }

  checkout(){
    this._cartService.checkout().subscribe(res => {}, err => {
      this._notifications.warning(err.message, 'Oops!');
      if(err.error == 'login'){
        setTimeout(() => {EmitterService.get('auth.init').emit({redirectTo: 'Checkout'})}, 1500);
      }
    });
  }

  ngOnInit() {
  }

}
