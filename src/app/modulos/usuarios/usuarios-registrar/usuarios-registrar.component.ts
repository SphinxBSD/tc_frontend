import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service'; 

import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/footer/footer.component";
import { HeaderComponent } from "../../../shared/header/header.component";


// Validator personalizado para confirmar que las contraseñas coinciden
function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    // Configura el error en matchingControl si la validación falla
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-usuarios-registrar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderComponent],
  templateUrl: './usuarios-registrar.component.html',
  styleUrl: './usuarios-registrar.component.css'
})
export class UsuariosRegistrarComponent implements OnInit {
  registerForm!: FormGroup;
  roles = [
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Comprador' },
    { id: 3, name: 'Artesano' }
  ];

  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      ci: ['', Validators.required],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      fecha_nac: ['', Validators.required],
      direccion: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
      id_rol: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirm_password')  // Validación de coincidencia de contraseña
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Aquí puedes hacer el llamado al servicio para registrar el usuario
      console.log(this.registerForm.value);
      const userData = this.registerForm.value;

      this.authService.register(  userData.ci,
        userData.nombre,
        userData.paterno,
        userData.materno,
        userData.fecha_nac,
        userData.direccion,
        userData.username,
        userData.email,
        userData.password,
        userData.id_rol
       ).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/auth/home']);
          // Redirigir o manejar la sesión de usuario aquí
        },
        error: (err) => {
          console.error('Error al registrar el usuario', err);
        }
      });
    }
  }
}