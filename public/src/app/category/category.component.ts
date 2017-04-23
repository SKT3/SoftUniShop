import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Category } from '../class/category.class';
import { CategoryService} from '../services/category.service';
import { LoggerService } from '../services/logger.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  /**
   * ID of category to fetch and dislay
   * @type {number}
   */
  categoryId: number;

  /**
   * Category object
   * @type {Category}
   */
  category: Category;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _categories: CategoryService,
              private _logger: LoggerService) { }

  ngOnInit() {
      this._route.params.subscribe(params => {
          this.categoryId = parseInt(params['id']);

          this._categories.getByID(this.categoryId).subscribe(res => {
              this.category = res.data;
              this._logger.log(this.category, '[Category] Category Loaded: ');
          });
      });
  }

}
