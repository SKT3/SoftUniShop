import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

import {Filter} from '../class/filter.class';
import {RangeFilter} from '../class/range-filter.class';

const FILTER_TYPES = {
    RANGE: 'range',
    SELECT: 'select',
    MULTIPICK: 'multipick'
};

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {
  /**
   * Emit Hide Filters Event
   * @type {EventEmitter}
   */
  @Output() onHide : EventEmitter<any> = new EventEmitter<any>();;

  /**
   * Emit filter changed event
   * @type {EventEmitter}
   */
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>(true);



   /**
    * Are filters visible
    * @type {boolean}
    */
  _filterVisible: boolean = true;

  /**
   * Filters array
   * @type {Array<Filter>}
   */
  _filters: Array<Filter>;

  /**
   * Selected filter value
   * @type {Array<any>}
   */
  chosenFilterValues: Array<Filter> = [];

  constructor() { }

  ngOnInit() {

  }

  @Input() set filtersInput(val: Array<Filter>){
      this._filters = [];

      for(let key in val){
          var title = key;
          let filter = (key == 'price')
                        ? new RangeFilter(key ,title , <any>val[key])
                        : new Filter(key, title, <any>val[key]);

          if(key != 'price' || (key == 'price' && Object.keys(val[key]).length > 1)){
              filter.getSubject().subscribe(change => this.onSubjectChange(change));
              this._filters.push(filter);
          }

      }
  }


  get filters(){
      return this._filters;
  }


  /**
   * Hide filters
   * @return {void}
   */
  hide(): void{
     this.filterVisible = false;
  }

  /**
   * Emit subject change
   * @param  {Array<any>} change Changed value
   * @return {void}
   */
  onSubjectChange(filter: Filter): void{
      var filterIndex = this.chosenFilterValues.map(f => f.name).indexOf(filter.name);

      if(filterIndex !== -1){
          if(filter.value.length == 0){
            this.chosenFilterValues.splice(filterIndex, 1);
          }else{
            this.chosenFilterValues[filterIndex] = filter;
          }
      }else{
          this.chosenFilterValues.push(filter);
      }


      this.onFilterChange.emit(this.chosenFilterValues);
  }

  get filterVisible(): boolean{
      return this._filterVisible;
  }

  set filterVisible(val: boolean){
      this._filterVisible = val;
      this.onHide.emit(this._filterVisible);
  }
}
