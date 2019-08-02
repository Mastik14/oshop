import { ProductService } from '../../../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products;
  dataSource: any[];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'category', 'price', 'edit'];
  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(products => (this.dataSource = this.products = products));
  }
  filter(query: string) {
    this.dataSource = query
      ? this.products.filter(
          p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}
}
