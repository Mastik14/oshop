import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      // @ts-ignore
      map(x => new ShoppingCart(x.items))
    );
  }
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }
  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if (!item) {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
      } else {
        // @ts-ignore
        const quantity = item.quantity + change;
        if (quantity === 0) { item$.remove(); } else { item$.update({ quantity }); }
      }
    });
  }
}
