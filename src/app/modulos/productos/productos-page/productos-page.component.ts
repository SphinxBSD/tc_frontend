import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ProductosService } from '../../../services/productos/productos.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompradorService } from '../../../services/comprador/comprador.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { Producto } from '../../../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.css'
})
export class ProductosPageComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];
  elaboraciones: any[] = [];
  selectedCategoria: string = '';
  selectedElaboracion: string = '';
  cantidadSeleccionada: { [key: number]: number } = {}; // Para manejar la cantidad seleccionada por producto

http: any;
  constructor(
    private productosService: ProductosService, 
    private compradorService: CompradorService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.cargarFiltros();
    this.cargarProductos();
  }

  cargarFiltros(): void {
    this.productosService.getCategorias().subscribe(
      data => this.categorias = data,
      err => console.error('Error al cargar categorías:', err)
    );

    this.productosService.getElaboraciones().subscribe(
      data => this.elaboraciones = data,
      err => console.error('Error al cargar elaboraciones:', err)
    );
  }


  cargarProductos(): void {
    const filtros: any = {};
    if (this.selectedCategoria) {
      filtros.id_categoria = this.selectedCategoria;
    }
    if (this.selectedElaboracion) {
      filtros.id_elaboracion = this.selectedElaboracion;
    }

    this.productosService.getProductos(filtros).subscribe(
      data => this.productos = data,
      err => console.error('Error al cargar productos:', err)
    );
  }

  onFiltroChange(): void {
    this.cargarProductos();
  }

  agregarAlCarrito(producto: Producto): void {
    const cantidad = this.cantidadSeleccionada[producto.id_producto] || 1;
    // console.log('Agregando al carrito:', producto);
    // console.log('Cantidad:', cantidad);
    this.carritoService.agregarProductoCarrito(producto.id_producto, cantidad).subscribe(
      {
        next: (response) => {
          console.log('Producto agregado al carrito:', response);
          Swal.fire({
            title: 'Producto agregado al carrito',
            text: 'El producto se ha agregado al carrito de compras',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        error: (error) => {
          console.error('Error al agregar producto al carrito:', error);
          Swal.fire({
            title: 'Error al agregar producto al carrito',
            text: 'Ha ocurrido un error al agregar el producto al carrito de compras',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    );
  }


}
