import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service'
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartCount = 0;
  private cartSubscription!: Subscription;
  private userSubscription!: Subscription;
  constructor(private router: Router, public authService: AuthService, private cartService: CartService,
    private toastService: ToastService
  ) { }

  logout() {
    this.authService.logout();
    this.toastService.show('Sesión cerrada', 'success');
    this.router.navigate(['/home']);

  }
  ngOnInit() {
    this.cartSubscription = this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });

    this.userSubscription = this.authService.currentUser$.subscribe(username => {
      if (username) {
        this.cartService.fetchCart().subscribe({
          next: (cart) => {
            const total = cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
            this.cartService.setCartCount(total);
          },
          error: () => this.cartService.setCartCount(0)
        });
      } else {
        this.cartService.setCartCount(0);
      }
    });
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }



  goHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }

  goProducts(event: Event) {
    event.preventDefault();
    this.router.navigate(['/products']);
  }

  goAbout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/about']);
  }

  goRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  goLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
  goCart() {
    this.router.navigate(['/cart']);
  }
  getUsername(): string {
  const token = this.authService.getToken();
  if (!token) return "";
  const payload = token.split('.')[1];
  if (!payload) return "";
  const decoded = JSON.parse(this.base64UrlDecode(payload));
  return decoded.sub || "";
}

  base64UrlDecode(base64Url: string): string {
    const base64 = base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');

    const decoded = atob(base64);
    try {
      return decodeURIComponent(escape(decoded));
    } catch (err) {
      console.error('Decoding error', err);
      return '';
    }
  }



}
