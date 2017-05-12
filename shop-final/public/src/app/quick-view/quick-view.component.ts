import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../class/product.class';


declare var jQuery : any;

@Component({
  selector: 'quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})

export class QuickViewComponent implements OnInit {

  _product: Product;

  imageIndex: number = 1;

  quantity: number = 1;

  @Output() dismissQuickView : EventEmitter<any>;

  constructor(private _products: ProductService) {
      this.dismissQuickView = new EventEmitter();
  }

  ngOnInit() {

  }

  prevImage(){
      this.imageIndex = (this.imageIndex == 1) ? 3 : this.imageIndex - 1;
  }

  nextImage(){
      this.imageIndex = (this.imageIndex >= 3) ? 1 : this.imageIndex + 1;
  }

  @Input() set product(val: Product){
      this._product = val;
      if(this._product)
        jQuery('#quick-view-modal').modal('show');
  }

  get product(): Product{
      return this._product;
  }

  dismiss(){
      this.dismissQuickView.emit(null);
  }
}
