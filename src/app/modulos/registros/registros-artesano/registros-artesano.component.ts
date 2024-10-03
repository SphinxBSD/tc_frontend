import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadService } from '../../../services/comunidad/comunidad.service';
import { Comunidad } from '../../../models/comunidad.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registros-artesano',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './registros-artesano.component.html',
  styleUrl: './registros-artesano.component.css'
})
export class RegistrosArtesanoComponent {

  comunidades: Comunidad[] = [];
  loading: boolean = false;
  error: string = '';

  // Variables para el modal
  selectedComunidad: Comunidad | null = null;
  solicitudMensaje: string = '';
  sending: boolean = false;
  sendError: string = '';
  sendSuccess: string = '';
  hideButtons: boolean = false;
  formularioActual: string | null = null;

  constructor(
    private comunidadService: ComunidadService,
    private router: Router,
  ) { 
    
  }

  mostrarFormulario(tipo: string) {
    //Buscar si el usuario tiene ya una comunidad registrada
    if (tipo === 'comunidad') {
      this.fetchComunidades();
    }
    this.formularioActual = tipo;
    this.hideButtons = true;
  }

  showButtons(){
    this.hideButtons = false;
    this.formularioActual = null;
  }

  fetchComunidades(): void {
    this.loading = true;
    this.comunidadService.getAllComunidades().subscribe({
      next: (data) => {
        this.comunidades = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener las comunidades:', err);
        this.error = 'Ocurrió un error al obtener las comunidades.';
        this.loading = false;
      }
    });
  }

  handleButtonClick(comunidad: Comunidad): void {
    console.log('ID Comunidad:', comunidad.id_comunidad);
    this.selectedComunidad = comunidad;
    this.solicitudMensaje = '';
    this.sendError = '';
    this.sendSuccess = '';
    // this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  sendSolicitud(comunidad:Comunidad | null): void {
    console.log('Enviando solicitud:', comunidad?.id_usuario);
    if (!this.selectedComunidad) return;

    this.sending = true;
    this.sendError = '';
    this.sendSuccess = '';
    if (comunidad){
      this.comunidadService.sendSolicitud(
        comunidad.id_comunidad,
        comunidad.id_usuario,
        this.solicitudMensaje
      )
      .subscribe({
        next: (response) => {
          this.sending = false;
          this.sendSuccess = 'Solicitud enviada exitosamente.';
          console.log('Solicitud enviada:', response);
          this.solicitudMensaje = '';
          this.selectedComunidad = null;
          // this.router.reload(); // Cerrar el modal al enviar la solicitud exitosamente
          // Cerrar el modal al enviar la solicitud exitosamente
        },
        error: (err) => {
          console.error('Error al enviar la solicitud:', err);
          this.sendError = 'Ocurrió un error al enviar la solicitud.';
          this.sending = false;
        }
      });
    }

    
  }

    // Cancelar y limpiar datos
    cancelarSolicitud() {
      this.limpiarDatos();
    }
  
    limpiarDatos() {
      this.solicitudMensaje = '';
      this.selectedComunidad = null;
    }
  
    // Cierra el modal manualmente
    // cerrarModal() {
    //   const modal = document.getElementById('solicitudComunidadModal');
    //   const bootstrapModal = bootstrap.Modal.getInstance(modal);
    //   bootstrapModal.hide();
    // }
  
}
