import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input } from '@angular/core';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate(2000)])
    ])
  ]
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}
  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
