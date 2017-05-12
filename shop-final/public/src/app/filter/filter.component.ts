import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Filter } from '../class/filter.class';
import { RangeFilter } from '../class/range-filter.class';
import * as slider from 'nouislider';
import {Subject} from 'rxjs/Rx';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

  /**
   * Filter object
   * @type {Filter}
   */
  _filter: Filter;

  constructor() { }

  ngOnInit() {

  }

  @Input() set filter(filter: Filter) {
     this._filter = filter;
  }

  /**
   * Get object keys(use in template)
   * @param  {Object} object
   * @return {Array<string>}
   */
  keys(object): Array<string>{
      return Object.keys(object);
  }

}
