import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ProductService} from '../services/product.service';
import {Product} from '../class/product.class';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  productId: number;
  product: Product;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _product: ProductService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.productId = parseInt(params['id']);
      console.log(this.productId)

      this._product.getByID(this.productId).subscribe(res => {
        this.product = res.data;
        console.log(this.product);
      })
    });
  }
}
