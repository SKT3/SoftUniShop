import {Product} from './product.class';

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

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.categoryId = data.categoryId;

        for(let child of data.children){
            this.children.push( new Category(child) );
        }
        for(let product of data.products){
            this.products.push(new Product(product));
        }
    }
}
