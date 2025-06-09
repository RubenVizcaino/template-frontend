import { Component } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';
import {NgClass} from '@angular/common';
import { NgForOf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [NgClass,NgForOf,AsyncPipe]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
