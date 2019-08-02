import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list('/orders')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }
  getOrderItems(orderId) {
    return this.db.object('/orders/' + orderId + '/items');
  }
  getOrderDate(orderId) {
    return this.db.object('/orders/' + orderId);
  }
  changeShipStatus(status, orderId) {
    this.getOrderDate(orderId).update({ ship: status });
  }
}
