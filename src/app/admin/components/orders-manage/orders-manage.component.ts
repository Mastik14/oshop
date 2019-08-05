import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-orders-manage',
  templateUrl: './orders-manage.component.html',
  styleUrls: ['./orders-manage.component.css']
})
export class OrdersManageComponent {
  orderId;
  orderDatePlaced: any = [];
  order$: any = [];
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.order$ = this.orderService.getOrderItems(this.orderId).valueChanges();
    this.orderDatePlaced = this.orderService
      .getOrderDate(this.orderId)
      .valueChanges();
  }
}
