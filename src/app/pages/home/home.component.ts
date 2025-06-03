import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',]
})
export class HomeComponent {
  products: Product[] = [];
  error: string | null = null;

  constructor(private productService: ProductService) {}

  loadProducts(): void {
    this.error = null; 
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        console.error(err);
      }
    });
  }



}
