import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { CompradorService } from '../../../services/comprador/comprador.service';
import { ProductosService } from '../../../services/productos/productos.service';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registros-comprador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule
  ],
  templateUrl: './registros-comprador.component.html',
  styleUrl: './registros-comprador.component.css'
})
export class RegistrosCompradorComponent implements OnInit{
  productosCarrito: any[] = [];
  formularioActual: string | null = null;

  total: number = 0;
  historial: any[] = [];

  hideButtons: boolean = false;

  pedidos: any[] = [];

  ubicacion = {
    latitud: 2,
    longitud: 3,
    direccion: ''
  };

  

  constructor(
    private carritoService: CarritoService,
    private compradorService: CompradorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    
    this.listarProductosCarrito();
  }

  display: any;
  center: google.maps.LatLngLiteral = { lat: -16.489689, lng: -68.2064792};
  zoom = 10;
  markers: google.maps.MarkerOptions[] = [];

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const coords = event.latLng.toJSON();
      this.center = event.latLng.toJSON();

      this.markers = [];
      this.markers.push({
        position: coords,
        label: {
          color: 'red',
          text: 'Ubicación seleccionada',
        },
        title: 'Ubicación seleccionada',
      }
      );
      if (this.markers[0]?.position?.lat) {
        this.ubicacion.latitud = typeof this.markers[0].position.lat === 'function' ? this.markers[0].position.lat() : this.markers[0].position.lat;
        this.ubicacion.longitud = typeof this.markers[0].position.lng === 'function' ? this.markers[0].position.lng() : this.markers[0].position.lng;
      }
      console.log('Ubicación:', this.ubicacion);
    }

    
  }

  move(event: google.maps.MapMouseEvent) {
    if(event.latLng){
      this.display = event.latLng.toJSON();
    }
  }

  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.ubicacion.latitud = position.coords.latitude;
          this.ubicacion.longitud = position.coords.longitude;
          this.center = { lat: this.ubicacion.latitud, lng: this.ubicacion.longitud };

          console.log('Ubicación obtenida:', this.ubicacion);
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          alert('No se pudo obtener la ubicación.');
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
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

  confirmarPedido(): void {
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
        this.compradorService.confirmarPedido(this.ubicacion.latitud, this.ubicacion.longitud).subscribe(
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
        this.cargarHistorial(); // Cargar el historial de compras
        // Aquí puedes manejar la lógica para mostrar el formulario de registro de artesano

      }
  
      //Buscar si el usuario tiene ya una comunidad registrada
      if (tipo === 'carrito') {
        
        this.calcularTotal(); // Calcular el total cuando se añadan productos
        console.log('Total:', this.total);
      }

      if (tipo === 'pedidos') {
        this.userService.getPedidos().subscribe({
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

      // Método para calcular el total
  calcularTotal(): void {
    this.total = this.productosCarrito.reduce((acc: number, item: any) => {
      return acc + (item.precio * item.cantidad);
    }, 0);
  }




  confirmarEntrega(id_pedido: number): void {
    Swal.fire({
      title: 'Confirmar entrega',
      text: '¿Está seguro de que desea confirmar la entrega de este pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }
      this.userService.confirmarEntrega(id_pedido).subscribe(() => {
        this.pedidos = this.pedidos.map(pedido => 
          pedido.id_pedido === id_pedido ? { ...pedido, estado: 'entregado' } : pedido
        );
      });
    });
    
  }

  cancelarPedido(id_pedido: number): void {
    console.log('Cancelar pedido', id_pedido);
    this.userService.cancelarPedido(id_pedido).subscribe(() => {
      this.pedidos = this.pedidos.map(pedido => 
        pedido.id_pedido === id_pedido ? { ...pedido, estado: 'cancelado' } : pedido
      );
    });
  }

}
