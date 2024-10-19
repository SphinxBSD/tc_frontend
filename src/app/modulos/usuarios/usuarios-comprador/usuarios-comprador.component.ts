import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user/user.service';
import { RegistrosCompradorComponent } from '../../registros/registros-comprador/registros-comprador.component';

@Component({
  selector: 'app-usuarios-comprador',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegistrosCompradorComponent
  ],
  templateUrl: './usuarios-comprador.component.html',
  styleUrl: './usuarios-comprador.component.css'
})
export class UsuariosCompradorComponent {
  userProfileForm!: FormGroup;
  user!: Usuario;
  isEditMode: boolean = false;
  rolName: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.getUserProfile();
  }

    // Inicializa el formulario
    initForm(): void {
      this.userProfileForm = this.fb.group({
        username: [{ value: '', disabled: true }, Validators.required],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        paterno: ['', Validators.required],
        materno: [''],
        fecha_nac: ['', Validators.required],
        direccion: [''],
        roles: [{ value: '', disabled: true }]  // Los roles no son editables por el usuario
      });
    }

    // Obtiene el perfil del usuario desde el servicio
    getUserProfile(): void {
      this.userService.getUserProfile().subscribe({
        next: (data: Usuario) => {
          this.user = data;
          this.rolName = data.roles;  // Obtiene el nombre del rol del usuario
          // console.log('Perfil del usuario:', data);
          const formattedDate = new Date(data.fecha_nac).toISOString().split('T')[0];
          this.userProfileForm.patchValue({
            username: data.username,
            email: data.email,
            nombre: data.nombre,
            paterno: data.paterno,
            materno: data.materno,
            fecha_nac: formattedDate,
            direccion: data.direccion,
           // roles: data.roles.join(', ')  // Muestra los roles en una lista separada por comas
          });
        },
        error: (error) => {
          console.error('Error al obtener el perfil del usuario', error);
        }
      });
    }

  onSubmit(){
    console.log("Enviando formulario");
  }

    // Cambia el formulario al modo de edición
    toggleEditMode(): void {
      this.isEditMode = !this.isEditMode;
      if (this.isEditMode) {
        this.userProfileForm.enable();  // Habilita los campos para edición
        this.userProfileForm.get('username')?.disable();  // Mantiene 'username' deshabilitado
        this.userProfileForm.get('email')?.disable();  // Mantiene 'email' deshabilitado
      } else {
        this.userProfileForm.disable();  // Deshabilita los campos si se sale del modo de edición
      }
    }

}
