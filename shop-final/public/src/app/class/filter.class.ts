import {Subject} from 'rxjs/Rx';

export class Filter{

    /**
     * Filter name
     * @type {string}
     */
    name: string;

    /**
     * Filter title to displau
     * @type {string}
     */
    title: string;

    /**
     * Available values
     * @type {Array<any>}
     */
    values: Array<any>;

    /**
     * Filter type
     * @type {string}
     */
    type: string = null;

    /**
     * Selected value
     * @see updateValue
     * @type {Array<any>}
     */
    value: Array<any>;

    /**
     * Subject for emitting value update
     * @see updateValue
     * @type {Subject<any>}
     */
    update: Subject<any>

    constructor(name: string, title: string, values: Array<any>){
        this.name = name;
        this.title = title;
        this.values = values;
        this.update = new Subject();
    }

    /**
     * Update value (on ngModelChange event)
     * @param {boolean}   event
     * @param {string |     number}      val Value to push/pop
     */
    updateValue(event: boolean, val: string | number): void{
        if(!this.value)
            this.value = [];

        let index = this.value.indexOf(val);
        if(index !== -1){
            this.value.splice(index, 1);
        }else{
            this.value.push(val);
        }
        //emit value change
        this.update.next(this);
    }

    /**
     * Get value subject
     * @return {Subject<any>}
     */
    getSubject(): Subject<any>{
        return this.update;
    }

}

//take brand -> take products with brand_id = brand.id -> take category (name, id) with id = product.category_id -> map( category => products with product.category_id = category.id)
