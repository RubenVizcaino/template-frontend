import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './pages/components/header/header.component';
import { ToastComponent } from './shared/toast/toast.component';
import { CustomPopupComponent } from './shared/custom-popup/custom-popup.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,CustomPopupComponent, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
