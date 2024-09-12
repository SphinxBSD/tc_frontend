import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';  // Importa el servicio
import { Router } from '@angular/router'; 
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.username && this.password) {
      console.log('Login', this.username, this.password);
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            // Redirigir a otra página después del login exitoso
            this.router.navigate(['/auth/home']);
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        },
        error: (err) => {
          this.errorMessage = 'Ocurrió un error, intenta de nuevo';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, llena ambos campos';
    }
  }
}
