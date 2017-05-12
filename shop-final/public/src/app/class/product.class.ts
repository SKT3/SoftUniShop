import { Filter } from './filter.class';
import { Discount } from './discount.class';
import { CategoryDiscount } from './category-discount.class';
export class Product{

    id: number;

    name: string;

    quantity: number;

    category_id: number;

    extra: ProductExtra;

    rating: ProductRating;

    discounts: Array<Discount | CategoryDiscount> = [];

    brand: any;

    public constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.quantity = data.quantity;
        this.category_id = data.category_id;
        this.extra = data.extra;
        this.rating = data.rating;
        this.brand = data.brand;
        for(let discount of data.discounts){
          this.discounts.push(new Discount(discount));
        }
    }

    get discount(){
      let reduced = null;
      if(this.discounts.length > 0){
        reduced = this.discounts.reduce((a: Discount, b: Discount) => (a.percentage > b.percentage) ? a : b);
      }

      return reduced;
    }

    get discountPrice(): number{
      let discount = this.discount;
      return parseFloat((this.extra.price - (this.extra.price * (discount.percentage / 100))).toFixed(2));
    }

    /**
     * Is Product compliant with a set of filters
     * @param  {Array<Filter>} filters
     * @return {boolean}
     */
    isCompliant(filters: Array<Filter>): boolean{
        if(filters.length == 0)
            return true;

        var compliantArr = [];

        filters.forEach(filter => compliantArr.push(false));
        let i = 0;
        for(let filter of filters){
            if(filter.type == 'range'){
                console.log(filter.value);
                compliantArr[i] = this.priceIsBetween(filter.value[0], filter.value[1]);
                i++;
                continue;
            }

            if(filter.value.length == 0){
                compliantArr[i] = true;
                i++;
                continue;
            }else{
                var toCheck = (this[filter.name] !== undefined)
                              ? this[filter.name]
                              : this.extra[filter.name];

                if(typeof toCheck === 'object')
                    toCheck = toCheck.name;
                let res = false;
                for(let value of filter.value){
                    if(toCheck == value){
                        compliantArr[i] = true;
                        res = true;
                        i++;
                        break;
                    }
                }
                if(!res) i ++;
            }
        }

        return compliantArr.every(el => el == true);
    }

    /**
     * Is Product price between min and max
     * @param  {number} min
     * @param  {number} max
     * @return {boolean}
     */
    private priceIsBetween(min: number, max: number): boolean{
        return this.extra.price >= min && this.extra.price <= max;
    }
}

interface ProductExtra{
    id: number,
    price: number,
    description: string,
    color: string,
    size: string,
    brand: any
}

interface ProductRating{
    rating: number,
    rating_count: number;
}
