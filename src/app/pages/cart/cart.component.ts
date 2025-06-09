import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product.model';
import { PopupService } from '../../services/popup.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor, DecimalPipe],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  total = 0;
  carts: any;

  constructor(private cartService: CartService, private productService: ProductService, private popupService: PopupService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.cartService.fetchCart().subscribe({
      next: (cart) => {
        this.carts = cart;
        const items = cart.items || [];
        if (items.length === 0) {
          this.items = [];
          this.total = 0;
          this.cartService.updateCartCountFromItems(this.items);
          return;
        }


        this.productService.getAll().subscribe({
          next: (products: Product[]) => {
            this.items = items.map((item: any) => ({
              ...item,
              product: products.find(prod => prod.id === item.productId)
            }));

            this.cartService.updateCartCountFromItems(this.items);
            this.total = this.items.reduce(
              (sum, item) => sum + item.quantity * (item.product?.price ?? 0), 0
            );
          },
          error: () => {
            this.items = [];
            this.total = 0;
          }
        });
      },
      error: () => {
        this.items = [];
        this.total = 0;
      }
    });
  }
  removeProduct(productId: number) {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.toastService.show('Producto borrado con éxito', 'success');
        this.ngOnInit();
      },
      error: () => {
      }
    });
  }

  removeAlLProducts() {
    const cartsId = this.carts?.id;
    this.popupService.showPopup({
      id: Date.now(),
      title: '¿Borrar carrito?',
      message: '¿Seguro que quieres borrar todo el carrito?',
      confirmText: 'Sí, borrar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        this.cartService.removeAllProducts(cartsId).subscribe({
          next: () => {
            this.toastService.show('Carrito borrado con éxito', 'success');
            this.ngOnInit();
          },
          error: () => {
            this.toastService.show('No se ha podido borrar el carrito', 'error');
          }
        });
      },
      onCancel: () => {
      }
    });


  }



}
