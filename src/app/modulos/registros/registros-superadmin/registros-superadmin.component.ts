import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registros-superadmin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registros-superadmin.component.html',
  styleUrl: './registros-superadmin.component.css'
})
export class RegistrosSuperadminComponent {
  hideButtons: boolean = false;
  formularioActual: string | null = null;
  error: string = '';
  opciones:boolean = false;

  usuarios: any[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  // Cargar lista de usuarios
  loadUsuarios(): void {
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }

  // Eliminar usuario
  deleteUsuario(id_usuario: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUsuario(id_usuario).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.loadUsuarios(); // Recargar la lista de usuarios
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      });
    }
  }

  mostrarFormulario(tipo: string) {
    //Buscar si el usuario tiene ya una comunidad registrada
    if (tipo === 'usuarios') {
      
      
    }
    if (tipo==='deliverys'){
      
    }
    this.formularioActual = tipo;
    this.hideButtons = true;
    this.opciones = false;
  }

  showButtons(){
    this.hideButtons = false;
    this.formularioActual = null;
    this.opciones = false;
  }

  showOpciones(){
    this.opciones = true;
    this.hideButtons = true;
  }
}
