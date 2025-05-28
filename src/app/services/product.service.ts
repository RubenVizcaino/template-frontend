import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { Product } from '../models/product.model';
import { HttpService } from './http.service'; 

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private HttpService: HttpService) {}

  getAll(): Observable<Product[]> {
    return this.HttpService.get<Product[]>(`${environment.apiUrl}/products`)
  }

  getById(id: number): Observable<Product> {
    return this.HttpService.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.HttpService.post<Product>(`${environment.apiUrl}/products`, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.HttpService.put<Product>(`${environment.apiUrl}/products/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.HttpService.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
}
