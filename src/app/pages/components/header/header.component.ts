import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

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
}
