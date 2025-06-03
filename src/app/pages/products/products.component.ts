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

import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [NgFor, DecimalPipe, FormsModule, MatSelectModule, MatFormFieldModule, MatSidenavModule,MatInputModule,MatIconModule]
})

export class ProductsComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  products: Product[] = [];
  filtered: Product[] = [];
  selectedCategory: string = '';
  maxPrice: number | null = null;

  


  constructor(private productService: ProductService) { }

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
}
