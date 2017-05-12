import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Category } from '../class/category.class';
import { CategoryService} from '../services/category.service';
import { LoggerService } from '../services/logger.service';
import { Product } from '../class/product.class';
import { Filter } from '../class/filter.class';
import { User } from '../class/user.class';

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  /**
   * ID of category to fetch and dislay
   * @type {number}
   */
  categoryId: number;

  /**
   * Category name
   * @type {string}
   */
  categoryName: string;

  /**
   * Category object
   * @type {Category}
   */
  category: Category;

  /**
   * User (if logged in)
   * @type {User}
   */
  user: User;

  /**
   * Product selected for Quick View
   * @type {Product}
   */
  quickViewProduct: Product;

  /**
   * Filers Array
   * @type {Array<any>}
   */
  filters: Array<any>;

  /**
   * Is component ready for display
   * @type {boolean}
   */
  ready: boolean = false;

  /**
   * Sorted criteria
   * @type {string}
   */
  sorted: string;


  /**
   * Has request pending
   * @type {boolean}
   */
  loading: boolean = true;

  /**
   * Begin filter hide animation
   * @type {Boolean}
   */
  beginAnimation = false;

  /**
   * Are filters visible
   * @type {Boolean}
   */
  filterVisible = true;

  /**
   * Page number
   * @type {number}
   */
  page: number = 1;

  /**
   * Total Count of products
   * @type {number}
   */
  totalCount: number;

  /**
   * Products per page
   * @type {number}
   */
  _offset: number = 12;

  selectedFilters = [];

  sortOrder = null;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _categories: CategoryService,
              private _logger: LoggerService,
              private _auth: AuthService) {
      this._auth.getCurrent().subscribe(user => {
        this.user = user;
      });
  }

  ngOnInit() {
      //subscribe to router params (in URL)
      this._route.params.subscribe(params => {
          this.categoryId = parseInt(params['id']);
          this.loading = true;
          this._categories.getByID(this.categoryId).subscribe(res => {
              this.category = new Category(res.data.category);
              this.categoryName = this.category.name;
              this.filters = res.data.filters;
              this.totalCount = res.data.totalProducts;
              this.ready = true;
              this.loading = false;
          });
      });
  }


  /**
   * Filter change handler
   * @param {Array<any>} change Fitler values
   */
  handleFilterChange(change: Array<Filter>): void{
      this.filter(change);
  }

  /**
   * Handle sort select
   * @param {string} sortBy
   */
  handleSort(sortBy: string): void{
    this.sortOrder = sortBy;
      this.sort(sortBy);
  }

  handlePageSelect(page: number){
      this.loading = true;
      this._categories.getByID(this.categoryId, page, this.offset).subscribe(res => {
          this.category = new Category(res.data.category);
          this.categoryName = this.category.name;
          this.ready = true;
          this.loading = false;
      });
  }

  /**
   * Filter Products
   * @param  {string} by Filter By
   * @return {void}
   */
  filter(by: Array<Filter>): void{
      this.loading = true;
      var sort = null;
      if(this.sortOrder){
        sort = {
          'order': this.sortOrder
        }
      }
      this._categories.getByID(this.categoryId, 1, 12, by, sort).subscribe(res => {
            this.clear();
            this.category = new Category(res.data.category);
            //this.filters = res.data.filters;
            this.selectedFilters = by;
            this.ready = true;
            this.loading = false;
      });
}
  /**
   * Sort products
   * @param {string} by Sort criteria
   */
  sort(by: string): void{
    this.loading = true;
    var sort = null;
    console.log(by);
    if(by && by != 'null' && by !== null){
      sort = {
        order: by
      };
    }
    console.log(sort);
    this._categories.getByID(this.categoryId, 1, 12, this.selectedFilters, sort).subscribe(res => {
          this.clear();
          this.category = new Category(res.data.category);
          //this.filters = res.data.filters;
          this.ready = true;
          this.loading = false;
    });
  }
  /**
   * Initate filters UI
   */
  initFilters(): void{
    var fixGallery = () => {
     		var offsetTop = $('.cd-main-content').offset().top,
     			scrollTop = $(window).scrollTop();
     		( scrollTop >= offsetTop ) ? $('.cd-main-content').addClass('is-fixed') : $('.cd-main-content').removeClass('is-fixed');
    };

    //fix lateral filter and gallery on scrolling
  	$(window).on('scroll', function(){
  		(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
  	});


  }

  /**
   * Iniate Quick View on Product
   * @param  {Product} product Product to view
   * @return {void}
   */
  initQuickView(product: Product): void{
      this.quickViewProduct = product;
  }

  /**
   * Close Quick View
   * @param  {boolean} val
   * @return {void}
   */
  dismissQV(val: boolean): void{
      this.beginAnimation = false;

      setTimeout(() => {
        this.quickViewProduct = null;
        },1000);

  }


  get offset(): number{
    return this._offset;
  }

  set offset(val: number){
    console.log(val);
        if(this._offset != val){
            var sorted = null;
            if(this.sortOrder != 'null' && this.sortOrder !== null){
              sorted = {
                order: this.sortOrder
              }
            }
            this.loading = true;
            this._offset = val;
            this._categories.getByID(this.categoryId, 1 , this._offset, this.selectedFilters, sorted).subscribe(res => {
                this.category = new Category(res.data.category);
                this.ready = true;
                this.loading = false;
            });

        }
  }

  /**
   * Clear component data
   */
  clear(): void{
      this.loading = true;
      this.category = null;
      this.ready = false;
  }

  /**
   * Sort on background when loading new products
   * @param  {string} by Sort criteria
   * @return {void}
   */
  backgroundSort(by: string): void{
      var index = by.indexOf(':'),
          order = by.slice(index),
          criteria = by.slice(0, - order.length);

      this.category.products.sort((a , b) => {
          if(order == ':desc'){
            if(a.extra[criteria] == b.extra[criteria])
                return 0;
            return a.extra[criteria] > b.extra[criteria] ? -1 : 1;
        }else if (order == ':asc'){
            if(a.extra[criteria] == b.extra[criteria])
                return 0;
            return a.extra[criteria] > b.extra[criteria] ? 1 : - 1;
          }
      });
  }

}
