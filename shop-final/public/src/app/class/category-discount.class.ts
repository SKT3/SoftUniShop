import {Discount} from './discount.class';

export class CategoryDiscount extends Discount{
  category_id: number;
  
  constructor(data){
    super(data);
    this.category_id = data.ctegory_id;
  }
}
