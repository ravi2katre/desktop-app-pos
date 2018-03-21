import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { PosComponent } from './pos/pos.component';
import { TransectionsComponent } from './transections/transections.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';

const appRoutes: Routes = [
    { path: '', pathMatch: 'full', component: PosComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'pos', component: PosComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'transections', component: TransectionsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'customers', component: CustomersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes,{ useHash: false }   );