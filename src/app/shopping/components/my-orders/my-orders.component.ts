import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  orders: any = [];
  ordersTotalPrice: any = [];
  arr: any = [];
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }
  async ngOnInit() {
    await this.orders$.subscribe(order => this.orders = order);
    await this.orders$.subscribe(
      order => this.ordersTotalPrice = order.map(x => x.items.map(y => y.totalPrice).reduce(( acc, cur ) => acc + cur, 0))
    );

  }
}
