import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Product } from '../class/product.class';
import { Cart } from '../class/cart.class';
import { CartService } from '../services/cart.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'cart-quick',
  templateUrl: './cart-quick.component.html',
  styleUrls: ['./cart-quick.component.css']
})
export class CartQuickComponent implements OnInit {

  cart : Cart;

  constructor(private _cartService: CartService,
              private _notifications: ToastsManager,
              vcr: ViewContainerRef) {
      this._notifications.setRootViewContainerRef(vcr);
      this._cartService.get().subscribe(cart => {
          this.cart = cart;
          console.log(this.cart);
      });
  }

  removeProduct(product: Product){
      this._cartService.removeProduct(product).subscribe((res) => {
          this._notifications.success(product.name, 'Successfully removed from cart!');
      });
  }

  ngOnInit() {
  }

}
