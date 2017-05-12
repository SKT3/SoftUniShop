import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EmitterService } from '../services/emitter.service';
import { Product } from '../class/product.class';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jQuery: any;

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  readonly ACTIONS: Array<string> = ['edit', 'delete'];

  action: string;

  product: Product;

  loading: boolean = false;

  quantity: number;

  category: number;

  categories: Array<any> = [];

  hasChanges: boolean = false;

  constructor(private _productService: ProductService,
              private _categoryService: CategoryService,
              private _notifications: ToastsManager,
              vcr: ViewContainerRef) {
    this._notifications.setRootViewContainerRef(vcr);
    EmitterService.get('product.action').subscribe(data => {
        this.init(data);
    });
  }

  onChange(change, prop){
    this.hasChanges = this.product.quantity != this.quantity || this.product.category_id != this.category;
  }

  submitEdit(){
    let query = {
    };
    if(this.quantity != this.product.quantity)
      query['quantity'] = this.quantity;

    if(this.category != this.product.category_id)
      query['category_id'] = this.category;
    this.loading = true;
    this._productService.update(this.product.id, query).subscribe(res => {
      EmitterService.get('product.update').emit(res.data);
      this.loading = false;
      this.close();
    }, err => {
      this.loading = false;
    });
  }


  init(data: { action: string, product: Product }): void{
    this.loading = true;
    if(this.ACTIONS.indexOf(data.action) !== -1){
      this.action = data.action;
      this.product = data.product;
      this.quantity = data.product.quantity;
      if(this.action == 'edit'){
        this._categoryService.getFlat().subscribe(res => {
          this.categories = res.data;
          this.loading = false;
        });
      }
      jQuery('#edit-product-modal').modal('show');
      this.loading = false;
    }
  }

  accept(){
    this.loading = true;
    this._productService.remove(this.product.id).subscribe(res => {
        this.loading = false;
        EmitterService.get('product.delete').emit(this.product.id);
        this._notifications.success(`Product ${this.product.name} successfully deleted!`);
        setTimeout(this.close(), 2000);
        this.close();
    }, err => this.loading = false);
    setTimeout(() => {this.loading = false;}, 3000);
  }

  decline(){
    this.close();
  }

  close(){
    jQuery('#edit-product-modal').modal('hide');
    this.product = null;
    this.category = null;
    this.quantity = null;
    this.hasChanges = false;
  }

  ngOnInit() {
  }



}
