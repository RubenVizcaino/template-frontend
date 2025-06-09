import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, NgIf]

})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role: 'CUSTOMER' = 'CUSTOMER';
  isLoading = false;
  errorMsg = '';

  constructor(private userService: UserService, private router: Router) { }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  register() {
    this.errorMsg = '';

    if (!this.username || !this.email || !this.password) {
      this.errorMsg = 'Por favor, completa todos los campos.';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMsg = 'El correo electrónico no es válido.';
      return;
    }

    this.isLoading = true;

    const newUser : User = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };
    
    this.userService.register(newUser).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Error al registrar. Inténtalo de nuevo.';
        this.toastService.show(this.errorMsg,'error');
      }
    });
  }
   goLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
