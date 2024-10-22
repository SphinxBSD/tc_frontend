import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user/user.service';
import { RegistrosSuperadminComponent } from '../../registros/registros-superadmin/registros-superadmin.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-superadmin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FooterComponent,
    HeaderComponent,
    RegistrosSuperadminComponent
  ],
  templateUrl: './usuarios-superadmin.component.html',
  styleUrl: './usuarios-superadmin.component.css'
})
export class UsuariosSuperadminComponent implements OnInit {

  userProfileForm!: FormGroup;
  user!: Usuario;
  isEditMode: boolean = false;
  rolName: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

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
        telefono: [''],
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
            telefono: data.telefono,
           // roles: data.roles.join(', ')  // Muestra los roles en una lista separada por comas
          });
        },
        error: (error) => {
          console.error('Error al obtener el perfil del usuario', error);
        }
      });
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
  
    // Envía el formulario para actualizar el perfil
    onSubmit(): void {
      if (this.userProfileForm.valid) {
        const updatedUser = {
          ...this.userProfileForm.value,
          id_usuario: this.user.id_usuario  // Asegura que el ID del usuario no se pierda
        };
  
        this.userService.updateUserProfile(updatedUser).subscribe({
          next: (response) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Usuario actualizado con éxito",
              showConfirmButton: false,
              timer: 2000
            });
            // console.log('Perfil actualizado con éxito');
            this.toggleEditMode();  // Sale del modo de edición
          },
          error: (error) => {
            console.error('Error al actualizar el perfil del usuario', error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al actualizar el usuario",
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
      }
    }

}
