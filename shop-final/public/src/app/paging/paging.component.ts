import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})


export class PagingComponent implements OnInit {

  @Input() totalCount: number;

  @Input() pageOffset: number;

  currentPage: number;

  _pageSelected: number = 1;

  @Output() pageSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {

  }

  /**
   * Select Page
   * @param  {number} page
   * @return {void}
   */
  select(page: number): void{
      this.pageSelected = page;
  }

  set pageSelected(val: number){
      this._pageSelected = val;
      this.pageSelect.emit(this._pageSelected);
  }

  get pageSelected(): number{
      return this._pageSelected;
  }

  get pages(): Array<number>{

      var pageCount = Math.ceil(this.totalCount/ this.pageOffset),
          out = [];

      for(let i = 1; i <= pageCount; i++){
          out.push(i);
      }

      return out;
  }

}
