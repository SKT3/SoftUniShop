import { Product } from './product.class';
import { User } from './user.class';

export class Cart{

    /**
     * Products in cart
     * @type {Array<CartProduct>}
     */
    products: Array<CartProduct> = [];

    /**
     * Cart has User (? maybe)
     * @type {User}
     */
    user: User;

    constructor(products = [], user = null){
        for(let p of products)
            this.products.push(new CartProduct( new Product(p.product), p.quantity ));

        this.user = user;
    }

    add(product: Product, quantity: number = 1){
        var index = this.products.map(p => p.product.id).indexOf(product.id);
        if(index !== -1){
            if(this.products[index].quantity >= this.products[index].product.quantity)
                throw new Error('quantity exceeded');
            this.products[index].quantity ++;

            return this.products[index];
        }

        this.products.push( new CartProduct(product, quantity) );

        return false;
    }

    changeQuantity(product: Product, quantity: number){
        var index = this.products.map(p => p.product.id).indexOf(product.id);
        if(index !== -1){
            if(this.products[index].product.quantity < quantity)
                throw new Error('quantity exceeded');
            this.products[index].quantity = quantity;
        }

        return true;
    }

    remove(product: Product){
        var index = this.products.map(p => p.product.id).indexOf(product.id);
        if(index !== -1)
            this.products.splice(index, 1);
    }

    productCount(): number{
        return this.products.length;
    }

    get totalPrice(): number{
        return this.products.map(p => (p.product.extra.price * p.quantity)).reduce((a, b) => a + b, 0);
    }

    get totalPriceDiscount(): number{
      return this.products.map(p => {
        if(p.product.discount)
          return (p.product.discountPrice * p.quantity);
        else
          return p.product.extra.price * p.quantity;
      }).reduce((a, b) => a + b, 0);
    }

    get hasDiscount(){
      return this.products.some(p => p.product.discount);
    }
}

export class CartProduct{
    product: Product;
    quantity: number;

    constructor(product: Product, quantity:number = 1){
        this.product = product;
        this.quantity = quantity;
    }

    get total(){
        return this.product.extra.price * this.quantity;
    }

    get totalDiscount(){
      return this.product.discountPrice * this.quantity;
    }
}
