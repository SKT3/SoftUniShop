import { Component, OnInit, Input } from '@angular/core';
import {Product} from '../class/product.class';

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

  constructor() { }

  ngOnInit() {
  }

}
