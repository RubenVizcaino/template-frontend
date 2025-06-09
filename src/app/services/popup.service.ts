import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

interface PopupData {
    id:any;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class PopupService {
    private popupSubject = new BehaviorSubject<PopupData | null>(null);

    get popup$(): Observable<PopupData | null> {
        return this.popupSubject.asObservable()
    }

    showPopup(data: PopupData) {
        console.log('SHOW POPUP CALLED:', data);
        this.popupSubject.next({ ...data, id: Date.now() });
    }

    closePopup() {
        this.popupSubject.next(null);
    }
}
