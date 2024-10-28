import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-delivery-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './asignar-delivery-modal.component.html',
  styleUrl: './asignar-delivery-modal.component.css'
})
export class AsignarDeliveryModalComponent implements OnInit{
  @Input() pedido: any = null;
  @Output() activar = new EventEmitter<void>();

  deliveries: any[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadDeliveries();
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

  asignarDelivery(id_delivery: number): void {
    if (this.pedido) {
      this.userService.asignarDelivery(this.pedido.id_pedido, id_delivery).subscribe({
        next: (data) => {
          console.log('Pedido asignado a delivery');
          Swal.fire('Pedido asignado a delivery', '', 'success');
          this.activarFuncionPadre();
        },
        error: (error) => {
          console.error('Error al asignar pedido a delivery', error);
          Swal.fire('Error al asignar pedido a delivery', '', 'error');
        }
        
      });
    }
  }

  activarFuncionPadre() {
    this.activar.emit();
  }
}
