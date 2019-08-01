import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../models/product';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  filteredProducts: Product[] = [];
  category;
  cart$: Observable<ShoppingCart>;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {
  }
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }
  private populateProducts() {
    this.productService.getAll().pipe(
      switchMap(products => {
        this.products$ = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products$.filter(p => p.category === this.category) :
      this.products$;
  }
}

