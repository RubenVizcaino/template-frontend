import { Component, OnDestroy } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-custom-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss']
})
export class CustomPopupComponent implements OnDestroy {
  popupData: any = null;
  private sub: Subscription;

 constructor(private popupService: PopupService) {
  this.sub = this.popupService.popup$.subscribe(data => {
    this.popupData = data;
  });
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onConfirm() {
    this.popupData?.onConfirm?.();
    this.popupService.closePopup();

  }
  onCancel() {
    this.popupService.closePopup();
    this.popupData?.onCancel?.();
  }
}
