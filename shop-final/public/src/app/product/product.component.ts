import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CartService } from '../services/cart.service';
import { EmitterService } from '../services/emitter.service';

import { User } from '../class/user.class';
import { Product } from '../class/product.class';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  /**
   * Product object input
   * @type  {Product}
   */
  @Input('input') product: Product;

  /**
   * User input( if logged in)
   * @type User
   */
  @Input() user: User;

  /**
   * Emit that Quick View Init has been clicked
   * @return {[type]} [description]
   */
  @Output() quickViewSelect: EventEmitter<any>;

  constructor(private _cart: CartService,
              private _notifications: ToastsManager,
              vcr: ViewContainerRef
            ) {
      this._notifications.setRootViewContainerRef(vcr);
      this.quickViewSelect = new EventEmitter();
  }

  ngOnInit() {
  }

  /**
   * Add Product to Cart
   */
  addToCart(): void{
      this._cart.addProduct(this.product).subscribe(res => {
          this._notifications.success(this.product.name, 'Successfully added to cart!');
      });
  }

  /**
   * Select product for quick view
   * @param {Product} product Product
   */
  selectForQuickView(product: Product): void{
      this.quickViewSelect.emit(product);
  }

  /**
   * Handle User rating input
   * @param {number} val Rating
   */
  handleRatingSelect(val: number): void{
      console.log(val);
  }

  /**
   * Emit product edit initalize
   */
  edit(): void{
    if(this.user && !this.user.is('basic'))
      EmitterService.get('product.action').emit({action: 'edit', product: this.product});
  }

  /**
   * Emit product delete initalize
   */
  delete(): void{
    if(this.user && !this.user.is('basic'))
      EmitterService.get('product.action').emit({action: 'delete', product: this.product});
  }

}
