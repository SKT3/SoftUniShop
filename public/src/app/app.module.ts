import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {UserService} from './user.service';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {AuthService} from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import {AppRoutingModule} from './app.routing';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';

import {AuthGuard} from './guards/auth.guard';
import {ProductService} from './services/product.service';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditorProfileComponent } from './editor-profile/editor-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';

import { CategoryService } from './services/category.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    HomePageComponent,
    NavbarComponent,
    UserProfileComponent,
    EditorProfileComponent,
    AdminProfileComponent,
    ProfileComponent,
    CategoryComponent,
    ProductComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule.forRoot()
  ],
  providers: [UserService,
              AuthService,
              ProductService,
              AuthGuard,
              CategoryService,
              LoggerService,
              { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
