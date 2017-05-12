import { Component, OnInit ,Input ,Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.css']
})
export class ProductRatingComponent implements OnInit {

  @Input() rating : number;
  @Output() ratingSelected : EventEmitter<any>;

  constructor() {
    this.ratingSelected = new EventEmitter(true);
  }

  ngOnInit() {
  }

  selectRating(val:number) : void{
    this.ratingSelected.emit(val);
  }

}
