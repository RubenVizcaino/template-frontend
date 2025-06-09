import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMsg = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  login() {
    this.errorMsg = '';

    if (!this.username || !this.password) {
      this.errorMsg = 'Por favor, completa todos los campos.';
      return;
    }

    this.isLoading = true;

    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token) {
          this.authService.saveToken(response.token);
          this.toastService.show('Sesión Iniciada', 'success');
          this.router.navigate(['/']); 
        } else {
          this.errorMsg = 'No se recibió un token válido.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
      }
    });
  }

   goRegister(event: Event) {
     event.preventDefault();
    this.router.navigate(['/register']);
  }
}
