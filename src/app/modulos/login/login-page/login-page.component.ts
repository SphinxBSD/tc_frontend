import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';  // Importa el servicio
import { Router } from '@angular/router'; 
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { PasswordRecoveryModalComponent } from '../password-recovery-modal/password-recovery-modal.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    PasswordRecoveryModalComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(private authService: AuthService,
      private router: Router,
      private recaptchaV3Service: ReCaptchaV3Service
    ) {}

  onLogin(): void {
    this.errorMessage = '';  // Limpiar cualquier mensaje de error previo
    this.loading = true;

    // Ejecutar reCaptcha v3 antes de hacer login
    this.recaptchaV3Service.execute('login').subscribe({
      next: (tokenCaptcha: string) => {

        // Llamar al servicio de autenticación
        this.authService.login(this.username, this.password, tokenCaptcha).subscribe({
          next: (response) => {
            this.loading = false;
            console.log('Login exitoso', response);
            this.router.navigate(['/auth/home']);
            // Redirigir o manejar la sesión de usuario aquí
          },
          error: (err) => {
            this.loading = false;
            this.errorMessage = 'Error en el login: ' + (err.error?.message || 'Error desconocido');
          }
        });
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Error en la verificación de captcha';
      }
    });


    // if (this.username && this.password) {
    //   console.log('Login', this.username, this.password);
    //   this.authService.login(this.username, this.password).subscribe({
    //     next: (response) => {
    //       if (response.success) {
    //         // Redirigir a otra página después del login exitoso
    //         this.router.navigate(['/auth/home']);
    //       } else {
    //         this.errorMessage = 'Credenciales incorrectas';
    //       }
    //     },
    //     error: (err) => {
    //       this.errorMessage = 'Ocurrió un error, intenta de nuevo';
    //       console.error(err);
    //     }
    //   });
    // } else {
    //   this.errorMessage = 'Por favor, llena ambos campos';
    // }
  }
}
