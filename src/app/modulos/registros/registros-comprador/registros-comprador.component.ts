import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { CompradorService } from '../../../services/comprador/comprador.service';
import { ProductosService } from '../../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registros-comprador',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './registros-comprador.component.html',
  styleUrl: './registros-comprador.component.css'
})
export class RegistrosCompradorComponent {
  productosCarrito: any[] = [];
  formularioActual: string | null = null;

  hideButtons: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private compradorService: CompradorService
  ) {}

  ngOnInit(): void {
    this.listarProductosCarrito();
  }

  listarProductosCarrito(): void {
    this.carritoService.listarProductosCarrito().subscribe(
      (productos) => {
        this.productosCarrito = productos;
      },
      (error) => {
        console.error('Error al listar productos del carrito:', error);
      }
    );
  }

  confirmarCompra(): void {
    this.compradorService.confirmarCompra().subscribe(
      {
        next: (response) => {
          console.log('Compra realizada:', response);
          this.productosCarrito = []; // Limpiar carrito después de la compra
          Swal.fire('Compra realizada', 'Gracias por su compra', 'success');

        },
        error: (error) => {
          console.error('Error al confirmar compra:', error);
          Swal.fire('Error', 'No se pudo realizar la compra', 'error');
        }
      }
    );
  }

    // Función para mostrar el formulario correspondiente
    mostrarFormulario(tipo: string) {

      if (tipo === 'historial'){
  
        // Aquí puedes manejar la lógica para mostrar el formulario de registro de artesano

      }
  
      //Buscar si el usuario tiene ya una comunidad registrada
      if (tipo === 'carrito') {

      }
      this.formularioActual = tipo;
      this.hideButtons = true;
    }

    showButtons(){
      this.hideButtons = false;
      this.formularioActual = null;
    }

}
