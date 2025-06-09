import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './productDetail.component.html',
  styleUrls: ['./productDetail.component.scss'],
  standalone: true,
  imports: [NgIf, DecimalPipe, FormsModule]
})
export class ProductDetailComponent implements OnInit {
  quantity = 1;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe(product => {
      this.product = product;
    });
  }

  addToCart(product: Product) {
    if (this.authService.isAuthenticated()) {
      this.cartService.addToCart(product.id, this.quantity).subscribe({
        next: () => {
          this.cartService.incrementCartCount(this.quantity);
          this.toastService.show('Producto añadido con éxito', 'success');
          this.router.navigate(['/products']);
        },
        error: err => {
          this.toastService.show('Error al añadir carrito', 'error');
          console.error(err);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
