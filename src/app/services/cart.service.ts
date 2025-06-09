import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from '../../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartCountSubject = new BehaviorSubject<number>(0);
    private apiUrl = `${environment.apiUrl}/cart`;

    constructor(private http: HttpService) { }

    addToCart(productId: number, quantity: number): Observable<any> {
        const body = { productId, quantity };
        return this.http.post(`${this.apiUrl}/add`, body);
    }
    setCartCount(count: number) {
        this.cartCountSubject.next(count);
    }
    incrementCartCount(quantity = 1) {
        this.cartCountSubject.next(this.cartCountSubject.value + quantity);
    }
    getCartCount(): Observable<number> {
        return this.cartCountSubject.asObservable();
    }
    getCurrentCount(): number {
        return this.cartCountSubject.value;
    }
    fetchCart(): Observable<any> {
        return this.http.get(`${this.apiUrl}/my`);
    }
    removeFromCart(productId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/remove/${productId}`);
    }
    updateCartCountFromItems(items: any[]) {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        this.setCartCount(count);
    }
    removeAllProducts(cartId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/removeAll/${cartId}`);
    }
}
