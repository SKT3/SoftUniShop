import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppRoutingModule} from './app.routing';
/* Notifications */
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';



import {AuthGuard} from './guards/auth.guard';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditorProfileComponent } from './editor-profile/editor-profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductRatingComponent } from './product-rating/product-rating.component';

import { CategoryService } from './services/category.service';
import { LoggerService } from './services/logger.service';
import { UserService } from './user.service';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { EmitterService } from './services/emitter.service';
/* Cloudinary Image CDN */
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '@cloudinary/angular';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { FiltersComponent } from './filters/filters.component';
import { FilterComponent } from './filter/filter.component';
import { NouisliderModule } from 'ng2-nouislider';
import { CartQuickComponent } from './cart-quick/cart-quick.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PagingComponent } from './paging/paging.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const cloudinaryLib = {
  Cloudinary: Cloudinary
};
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
    ProductPageComponent,
    QuickViewComponent,
    ProductRatingComponent,
    FiltersComponent,
    FilterComponent,
    CartQuickComponent,
    CartPageComponent,
    PagingComponent,
    EditProductComponent,
    CheckoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
     CloudinaryModule.forRoot(cloudinaryLib, { cloud_name: 'dw5nh0eed'}),
    ToastModule.forRoot(),
    NouisliderModule
  ],
  providers: [UserService,
              AuthService,
              ProductService,
              AuthGuard,
              CategoryService,
              LoggerService,
              CartService,
              EmitterService,
              CookieService,
              { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
