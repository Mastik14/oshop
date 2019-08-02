import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';

import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
