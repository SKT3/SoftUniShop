import {Filter} from './filter.class';

export class RangeFilter extends Filter{

    /**
     * Range (min,max)
     */
    _range: Array<number | string>;

    /**
     * FIlter type
     * @type {string}
     */
    type : string = 'range';

    min;

    max;
    constructor(name: string, title: string, values: Array<any> ){
        super(name, title, values);
        this.values = Object.keys(values).map(key => parseFloat(key)).sort();
        if(this.type != 'range')
            throw new FilterError('Invalid RangeFilter type');
        console.log(this.values);
        this.min = this.values.reduce((a, b) => a < b ? a : b);

        this.max = this.values.reduce((a, b) => a > b ? a : b);
        this.range =
        [
             this.min,
             this.max
        ];
    }

    updateValue(event: boolean, val: string | number){
        this.update.next(this);
    }

    set range(val){
        this._range = val;
        this.value = this._range;
    }

    get range(){
        return this._range;
    }
}



/**
 * Filter Exception
 */
class FilterError extends Error{
    constructor(message){
        super(message);
    }
}
