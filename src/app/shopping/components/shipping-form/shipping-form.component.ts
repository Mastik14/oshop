import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Shipping } from '../../../shared/models/shipping';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  ship: any;
  Subscription: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.Subscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }
  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }
  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart, this.ship);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['order-success', result.key]);
  }
}
