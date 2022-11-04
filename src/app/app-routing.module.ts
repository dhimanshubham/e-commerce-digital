import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateComponent } from './seller-update/seller-update.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
 {path:'signin',component:SigninComponent},
 {path:'signup',component:SignupComponent},
 {path:'home',component:HomeComponent},
 {path: 'seller-home',component:SellerHomeComponent,
  canActivate:[AuthGuard]},
  {path: 'add-product',component:AddProductComponent},
  {path: 'listing',component:ListingComponent},
  {path: 'seller-update/:id',component:SellerUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
