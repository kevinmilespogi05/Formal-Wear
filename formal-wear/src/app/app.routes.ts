import { Routes } from '@angular/router';
import { LoginECommComponent } from './login/login.component';
import { RegisterECommComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { AllProductsComponent } from './product-listing/product-listing.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'product-listing', component: AllProductsComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginECommComponent },
    { path: 'register', component: RegisterECommComponent },
];
