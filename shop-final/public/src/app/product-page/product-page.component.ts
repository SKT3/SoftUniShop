import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ProductService} from '../services/product.service';
import {Product} from '../class/product.class';
import { CartService } from '../services/cart.service';



import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-product-page',
 templateUrl: './product-page.component.html',
 styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  productId: number;

  product: Product;

  quantity: number = 1;

  indexSelected: number = 1;
  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _product: ProductService,
              private _cart: CartService,
              private _notifications: ToastsManager,
              vcr: ViewContainerRef) {
                this._notifications.setRootViewContainerRef(vcr);
           }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.productId = parseInt(params['id']);
      console.log(this.productId);

      this._product.getByID(this.productId).subscribe(res => {
        this.product = res.data;
        console.log(this.product);
      })
    });
  }

  /**
   * Add Product to Cart
   */
  addToCart(): void{
      this._cart.addProduct(this.product, this.quantity).subscribe(res => {
          this._notifications.success(this.product.name, 'Successfully added to cart!');
      });
  }
}
