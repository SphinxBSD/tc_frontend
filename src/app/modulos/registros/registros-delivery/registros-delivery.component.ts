import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registros-delivery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registros-delivery.component.html',
  styleUrl: './registros-delivery.component.css'
})
export class RegistrosDeliveryComponent implements OnInit{

  formularioActual: string | null = null;
  hideButtons: boolean = false;

  pedidos: any[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
  }


  mostrarFormulario(tipo: string) {

    if (tipo === 'pedidos') {
      this.userService.getPedidosDelivery().subscribe({
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
  }
  
  showButtons(){
    this.hideButtons = false;
    this.formularioActual = null;
  }

}
