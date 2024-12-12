import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RentComponent } from './user/rent/rent.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SidenavComponent as UserSidenavComponent } from './user/sidenav/sidenav.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NewproductComponent } from './admin/newproduct/newproduct.component';
import { ProductlistComponent } from './admin/productlist/productlist.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { SidenavComponent as AdminSidenavComponent } from './admin/sidenav/sidenav.component';

export const routes: Routes = [
  { path: '', redirectTo: '/rent', pathMatch: 'full' },
  {
    path: 'rent',
    component: RentComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: UserSidenavComponent,
    children: [
      { path: '', component: ProfileComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminSidenavComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'newproduct', component: NewproductComponent },
      { path: 'productlist', component: ProductlistComponent },
      { path: 'analytics', component: AnalyticsComponent },
    ],
  },
  { path: '**', redirectTo: '/rent' },
];
