import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../class/category.class';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  /**
   * Categories List to display on home page
   * @type {Array<Category>}
   */
  categories: Array<Category>;

  constructor(private _auth: AuthService,
              private _categories: CategoryService,
              private _logger: LoggerService)
    {

                this._categories.categoriesList().subscribe(res => {
                    this.categories = res.data;
                    this._logger.log(this.categories, '[HomePage] Categories Loaded');
                });
    }

    ngOnInit() {

    }
}
