import { Injectable } from '@angular/core';
import { Cart, CartProduct} from '../class/cart.class';
import { Product } from '../class/product.class';
import { User } from '../class/user.class';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class CartService {

  /**
   * Cart object reference
   * @type {Cart}
   */
  _cart : Cart;

  user: User;

  cartSubject: ReplaySubject<Cart>;

  constructor(private _cookie: CookieService,
              private _http: Http,
              private _auth: AuthService) {
      this.cartSubject = new ReplaySubject();
      this._auth.getCurrent().subscribe(user => this.user = user);
      this.getCart().subscribe();
  }

  /**
   * Add product to cart
   * @param  {Product}   product Product to add
   * @param  {number =       1}           quantity
   * @return {Observable<any>}            Response
   */
  addProduct(product: Product, quantity: number = 1){
      let price = product.extra.price;
      if(product.discount)
        price = product.discountPrice;
      try{
          var incremented = this.cart.add(product, quantity);
      }catch(e){
          return Observable.throw('You have already added the maximum available quantity for this product!');
      }

      var api = 'api/cart/add';
      var query;

      if(incremented){
          api = 'api/cart/quantity';
          query = {
              data: {
                  product_id: (<CartProduct>incremented).product.id,
                  quantity: (<CartProduct>incremented).quantity,
                  price: price
              }
          };
      }else{
          query = {
              data : {
                  product_id: product.id,
                  quantity: quantity,
                  price: price
              }
          };
      }

     return this._http.post(api, query)
                .map((response: Response) => {
                    this.cartSubject.next(this.cart);
                    return response.json();
                });
  }

  checkout(){
    if(!this.user)
      return Observable.throw({error: 'login', message: 'Please, login before checkout'});

    return this._http.post('/api/checkout', {}).map(res =>{
      this.cart = new Cart();
      return res.json()});

  }

  changeQuantity(product: Product, quantity){
      try{
          this.cart.changeQuantity(product, quantity);
      }catch(e){
          return Observable.throw('You have already added the maximum available quantity for this product!');
      }
      var query = {
          data: {
              product_id: product.id,
              quantity: quantity,
              price : 1
          }
      }
      return this._http.post('api/cart/quantity', query)
                        .map((res : Response) => {
                            this.cartSubject.next(this.cart);
                            return res.json();
                        });

  }

  set cart(val: Cart){
      this._cart = val;
      this.cartSubject.next(this._cart);
  }

  get cart(): Cart{
      return this._cart;
  }
 /**
  * Remove product from cart
  * @param  {Product}         product Product to remove
  * @return {Observable<any>}         Response
  */
  removeProduct(product: Product){
      this.cart.remove(product);
      var query = {
          data: {
              product_id: product.id,
              quantity: 1,
              price: 1
          }
      }
      return this._http.post('api/cart/remove', query)
                        .map((response: Response) => {
                            this.cartSubject.next(this.cart);
                            return response.json();
                        });
  }

  get(): ReplaySubject<Cart>{
      return this.cartSubject;
  }

  getCart(){

      //get cart from server (session) if any
      return this._http.get('api/cart').map((response: Response) => {
          var cartResponse = response.json().cart;
          this.cart = cartResponse ? new Cart(cartResponse.products) : new Cart();
          return this.cart;
      }).catch(err => {
          this.cart = new Cart();
          return Observable.throw(err.json.error);
      });
  }

  getProductCount(): number{
      return this.cart ? this.cart.productCount() : 0;
  }

}
