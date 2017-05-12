import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';
import { CategoryService } from './services/category.service';
import { Category } from './class/category.class';
import { User } from './class/user.class';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
    private categories: Array<Category>;
    private user: User;
    constructor(private _auth: AuthService,
                private _categories: CategoryService,
                private _logger: LoggerService){

        this._auth.isLoggedIn().then((logged) => {
            this._auth.getCurrent().subscribe(user => {
                this.user = user;
                console.log(this.user);
            });
        });

        this._categories.categoriesList().subscribe(res => {
            this.categories = res.data;
            this._logger.log(this.categories, '[AppComponent] Categories Loaded');
        });

    }

  title = 'app works!';
}
