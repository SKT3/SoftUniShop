import {NgModule}   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ProfileComponent} from './profile/profile.component';
import {CategoryComponent} from './category/category.component';

import {AuthGuard} from './guards/auth.guard';
import {ProductPageComponent} from "./product-page/product-page.component";

const appRoutes: Routes = [
  /**
   * Authentication
   */
  { path: 'auth', component:  AuthComponent,
    children: [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'register', component: RegisterComponent},
        {path: 'login', component: LoginComponent}
    ]
   },
   /**
    * Home Page
    */
   {
       path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
   },
   /**
    * User Profile
    */
   {
       path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
   },
    {
        path: 'category/:id', component: CategoryComponent
    },
    {
        path: 'product/:id', component: ProductPageComponent
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
