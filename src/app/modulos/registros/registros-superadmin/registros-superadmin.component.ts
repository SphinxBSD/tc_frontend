import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { AsignarDeliveryModalComponent } from './asignar-delivery-modal/asignar-delivery-modal.component';

@Component({
  selector: 'app-registros-superadmin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AsignarDeliveryModalComponent
  ],
  templateUrl: './registros-superadmin.component.html',
  styleUrl: './registros-superadmin.component.css'
})
export class RegistrosSuperadminComponent implements OnInit {
  hideButtons: boolean = false;
  formularioActual: string | null = null;
  error: string = '';
  opciones:boolean = false;

  usuarios: any[] = [];
  usuariosDelivery: any[] = [];

  deliveries: any[] = [];

  isUpload: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  @ViewChild('documento', { static: false }) fileInput!: ElementRef;

  selectedUserId: number | null = null;

  pedidoSeleccionado: any | null = null;

  pedidos: any[] = [];

  constructor(
    private router: Router, 
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadDeliveries();
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

    // Cargar lista de usuarios
    loadDeliverys(): void {
      this.userService.getDelivery().subscribe({
        next: (data) => {
          this.usuariosDelivery = data;
        },
        error: (error) => {
          console.error('Error al obtener los usuarios delivery:', error);
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
    if (tipo==='aprobarD'){
      this.loadDeliverys();
    }

    if (tipo === 'listarD') {
      this.loadDeliveries()
    }

    if (tipo === 'pedidos'){
      this.userService.getAllPedidos().subscribe({
        next: (data) => {
          this.pedidos = data;
        },
        error: (error) => {
          console.error('Error al cargar los pedidos', error);
        }
      }
      );
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

  createDelivery(id_usuario: number): void {

    if (this.selectedFile && id_usuario) {
      this.userService.createDelivery(id_usuario, this.selectedFile).subscribe(
        {
          next: (response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Delivery creado con éxito',
              showConfirmButton: false,
              timer: 2500
            });
            this.loadDeliveries(); // Recargar la lista
          },
          error: (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al crear delivery',
              showConfirmButton: false,
              timer: 2500
            });
            console.error('Error al crear el delivery', error);
          }
        }
      );
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al crear delivery',
        text: 'Debes subir el contrato de delivery',
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

  loadDeliveries(): void {
    this.userService.getDeliveries().subscribe(
      {
        next: (data) => {
          this.deliveries = data;
          console.log('Deliveries cargados:', this.deliveries);
        },
        error: (error) => {
          console.error('Error al cargar deliveries', error);
        }
      }
      
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name; // Guarda el nombre del archivo para mostrarlo
      this.isUpload = true;
      console.log('Archivo seleccionado:', this.selectedFileName);
    }
    
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // marcarAsignado(id_pedido: number): void {
  //   this.userService.asignarPedido(id_pedido).subscribe(() => {
  //     this.pedidos = this.pedidos.map(pedido => 
  //       pedido.id_pedido === id_pedido ? { ...pedido, estado: 'asignado' } : pedido
  //     );
  //   });
  // }

  openAsignarDeliveryModal(pedido: any): void {
    this.pedidoSeleccionado = pedido;
    // const modalRef = this.modalService.open(AsignarDeliveryModalComponent);
    // modalRef.componentInstance.id_pedido = id_pedido;
  }
}
