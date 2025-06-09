import { Component, viewChild } from '@angular/core';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [NgFor, DecimalPipe, FormsModule, MatSelectModule, MatFormFieldModule, MatSidenavModule, MatInputModule, MatIconModule]
})

export class ProductsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  products: Product[] = [];
  filtered: Product[] = [];
  selectedCategory: string = '';
  maxPrice: number | null = null;




  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filtered = data;
      }
    });
  }

  applyFilters() {
    this.filtered = this.products
      .filter(prod => this.selectedCategory ? prod.category === this.selectedCategory : true)
      .filter(prod => this.maxPrice !== null ? prod.price <= this.maxPrice : true);
  }

  
  goToProductDetail(productId: number, event: Event) {
    event.preventDefault();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/productDetail', productId]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
