import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  navbarCollapsed: boolean;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();

  }

  logout() {
    this.auth.logout();
  }

}
