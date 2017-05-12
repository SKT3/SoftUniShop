import {NgModule}   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ProfileComponent} from './profile/profile.component';
import {CategoryComponent} from './category/category.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {ProductPageComponent} from "./product-page/product-page.component";
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';


const appRoutes: Routes = [
  /**
   * Authentication
   */
  // { path: 'auth', component:  AuthComponent,
  //   children: [
  //       {path: '', redirectTo: 'login', pathMatch: 'full'},
  //       {path: 'register', component: RegisterComponent},
  //       {path: 'login', component: LoginComponent}
  //   ]
  //  },
   /**
    * Home Page
    */
   {
       path: 'home', component: HomePageComponent
   },
   /**
    * User Profile
    */
   {
       path: 'profile', component: ProfileComponent
   },
    {
        path: 'category/:id', component: CategoryComponent
    },
    {
        path: 'product/:id', component: ProductPageComponent
    },
    {
        path: 'cart', data: { name: 'Cart' }, component: CartPageComponent,
    },
    {
       path: 'checkout', data: {name : 'Checkout'}, component: CheckoutComponent, canActivate: [AuthGuard]
    },
    {
       path: 'dashboard', data: {name : 'Dashboard'}, component: DashboardComponent
    },
    {
       path: '', redirectTo: 'home', pathMatch: 'full'
    }
];

@NgModule({
 imports: [
   RouterModule.forRoot(appRoutes)
 ],
 exports: [
   RouterModule
 ]
})

export class AppRoutingModule {}
