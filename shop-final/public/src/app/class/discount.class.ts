import * as moment from 'moment';

export class Discount{
  id: number;
  start: any;
  end: any;
  percentage: number;
  _start: any;
  _end: any;
  constructor(data){
    for(let key in data)
      this[key] = data[key];

      this._start = moment(this.start);
      this._end = moment(this._end);
      this.start = moment(this.start).format('YYYY-MM-DD');
      this.end = moment(this.end).format('YYYY-MM-DD');
  }

  isValid(){
    // let range = moment().range(this.start, this.end);
    return
  }

}
