import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { RentComponent } from './user/rent/rent.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SidenavComponent as UserSidenavComponent } from './user/sidenav/sidenav.component'; // Import UserSidenav
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NewproductComponent } from './admin/newproduct/newproduct.component';
import { ProductlistComponent } from './admin/productlist/productlist.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { SidenavComponent as AdminSidenavComponent } from './admin/sidenav/sidenav.component';
import { UsersComponent } from './admin/users/users.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'rent',
    component: UserSidenavComponent,  // Wrap RentComponent with UserSidenav
    children: [
      { path: '', component: RentComponent },
    ],
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
    component: UserSidenavComponent,  // Wrap ProfileComponent with UserSidenav
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
      { path: 'users', component: UsersComponent },
    ],
  },
  { path: '**', redirectTo: '/rent' },
];
