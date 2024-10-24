import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { CompradorService } from '../../../services/comprador/comprador.service';
import { ProductosService } from '../../../services/productos/productos.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registros-comprador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registros-comprador.component.html',
  styleUrl: './registros-comprador.component.css'
})
export class RegistrosCompradorComponent {
  productosCarrito: any[] = [];
  formularioActual: string | null = null;

  total: number = 0;
  historial: any[] = [];

  hideButtons: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private compradorService: CompradorService
  ) {}

  ngOnInit(): void {
    this.cargarHistorial();
    this.listarProductosCarrito();
  }

  cargarHistorial(): void {
    this.compradorService.getHistorialCompras().subscribe(
      (data) => {
        this.historial = data;
      },
      (error) => {
        console.error('Error al cargar el historial de compras', error);
      }
    );
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

  // Eliminar producto del carrito
  eliminarProducto(id_producto: number): void {
    this.carritoService.eliminarProducto(id_producto).subscribe(
      () => {
        // Actualizar la vista después de eliminar el producto
        this.productosCarrito = this.productosCarrito.filter(item => item.id_producto !== id_producto);
        this.calcularTotal(); // Recalcular el total
      },
      (error) => {
        console.error('Error al eliminar producto del carrito', error);
      }
    );
  }

  confirmarCompra(): void {
    Swal.fire({
      title: 'Confirmar compra',
      // text: '¿Está seguro de que desea realizar la compra? Debe escanear el siguiente código QR para confirmar la compra',
      html: `<p>¿Está seguro de que desea realizar la compra?
      <br/>Debe escanear el siguiente <strong>código QR</strong> antes de confirmar la compra</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      footer: `<img
                src="assets/images/primero.png"
                alt="Registro de Comunidad"
                class="img-fluid"
              />`
    }).then((result) => {
      if (result.isConfirmed) {
        this.compradorService.confirmarCompra().subscribe(
          {
            next: (response) => {
              console.log('Compra realizada:', response);
              this.productosCarrito = []; // Limpiar carrito después de la compra
              this.total = 0; // Limpiar total después de la compra
              Swal.fire('Compra realizada', 'Gracias por su compra', 'success');
    
            },
            error: (error) => {
              console.error('Error al confirmar compra:', error);
              Swal.fire('Error', 'No se pudo realizar la compra', 'error');
            }
          }
        );
      }
    });
  }

    // Función para mostrar el formulario correspondiente
    mostrarFormulario(tipo: string) {

      if (tipo === 'historial'){
  
        // Aquí puedes manejar la lógica para mostrar el formulario de registro de artesano

      }
  
      //Buscar si el usuario tiene ya una comunidad registrada
      if (tipo === 'carrito') {
        
        this.calcularTotal(); // Calcular el total cuando se añadan productos
        console.log('Total:', this.total);
      }
      this.formularioActual = tipo;
      this.hideButtons = true;
    }

    showButtons(){
      this.hideButtons = false;
      this.formularioActual = null;
    }

      // Método para calcular el total
  calcularTotal(): void {
    this.total = this.productosCarrito.reduce((acc: number, item: any) => {
      return acc + (item.precio * item.cantidad);
    }, 0);
  }

}
