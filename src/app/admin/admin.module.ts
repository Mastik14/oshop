import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { OrdersManageComponent } from './components/orders-manage/orders-manage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders/:orderId',
        component: OrdersManageComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ])
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrdersManageComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
