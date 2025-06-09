import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error';
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this._toasts.asObservable();

  show(text: string, type: 'success' | 'error' = 'success') {
    const id = Date.now();
    const newToast: ToastMessage = { text, type, id };
    const current = this._toasts.getValue();
    this._toasts.next([...current, newToast]);
    setTimeout(() => this.remove(id), 3000); 
  }

  remove(id: number) {
    const current = this._toasts.getValue().filter(t => t.id !== id);
    this._toasts.next(current);
  }
}
