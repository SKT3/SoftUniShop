import {Product} from './product.class';
import {CategoryDiscount} from './category-discount.class';
import {EmitterService} from '../services/emitter.service';

export class Category{

    id: number;

    name: string;

    categoryId: number;
    /**
     * Child categories
     * @type {Array<Category>}
     */
    children: Array<Category> = [];
    /**
     * Category products
     * @type {Array<Product>}
     */
    products ?: Array<Product> = [];

    discounts: Array<CategoryDiscount> = [];

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.categoryId = data.categoryId;

        if(data.children){
            for(let child of data['children']){
                this.children.push( new Category(child) );
            }
        }
        if(data.products){
            for(let product of data['products']){
                this.products.push(new Product(product));
            }
        }

        for(let discount of data['discounts']){
          let disc = new CategoryDiscount(discount);
          this.discounts.push(disc);
          this.products.forEach(product => product.discounts.push(disc));
        }

        EmitterService.get('product.delete').subscribe(id => this.remove(id));
        EmitterService.get('product.update').subscribe(product => this.update(product));

    }

    private update(productObj: any){
      let index = this.products.map(product => product.id).indexOf(productObj.id);
      if(index !== -1){
        if(productObj.category_id != this.products[index].category_id)
          this.products.splice(index, 1);
        else
          this.products[index] = new Product(productObj);
      }
    }

    private remove(id: number){
      let index = this.products.map(product => product.id).indexOf(id);
      if(index !== -1)
        this.products.splice(index, 1);
    }


}
