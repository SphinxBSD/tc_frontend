import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ProductosService } from '../../../services/productos/productos.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompradorService } from '../../../services/comprador/comprador.service';
import { CarritoService } from '../../../services/carrito/carrito.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Producto } from '../../../models/producto.model';
import Swal from 'sweetalert2';

import { ReviewsModalComponent } from '../reviews-modal/reviews-modal.component';


interface ProductoCalificado {
  id_producto: number;
  review: any;
  promedio: number;
}

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReviewsModalComponent
  ],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.css'
})
export class ProductosPageComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];

  productoReview!: ProductoCalificado;
  id_producto: number = 0;

  reviewForm: FormGroup;

  elaboraciones: any[] = [];
  selectedCategoria: string = '';
  selectedElaboracion: string = '';
  cantidadSeleccionada: { [key: number]: number } = {}; // Para manejar la cantidad seleccionada por producto

http: any;
  constructor(
    private productosService: ProductosService, 
    private compradorService: CompradorService,
    private carritoService: CarritoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

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
      {
        next: (data) => {
          this.productos = data;
        },
        error: (error) => {
          console.error('Error al cargar productos:', error);
        }
      }
    );
  }

  onFiltroChange(): void {
    this.cargarProductos();
  }

  agregarAlCarrito(producto: Producto): void {
    const cantidad = this.cantidadSeleccionada[producto.id_producto] || 1;

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


  mostrarReview(idProducto: number): void {
    this.productosService.getProductReviews(idProducto).subscribe(
      {
        next: (data) => {
          this.productoReview = {
            id_producto: idProducto,
            review: data.reviews[0] || 'Sin reseñas',
            promedio: data.avgRating[0].avgRating || 0
          };
          console.log('Calificaciones:', this.productoReview);
          console.log('Only revieews:', this.productoReview.review);
        },
        error: (error) => {
          console.error('Error al cargar calificaciones:', error);
        }
      }
    );

  }

  submitReview(): void {
    if (!this.authService.isAuthenticated()) {
      // this.errorMessage = 'Debes estar autenticado para dejar una reseña.';
      Swal.fire('Error al enviar reseña', 'Debes estar autenticado para dejar una reseña.', 'error');
      return;
    }

    if (this.reviewForm.valid) {
      const reviewData = {
        id_producto: this.id_producto,
        rating: this.reviewForm.value.rating,
        description: this.reviewForm.value.description
      };

      this.productosService.addReview(reviewData).subscribe({
        next: () => {
          Swal.fire('Reseña enviada', 'Gracias por tu reseña', 'success');
          this.reviewForm.reset();
          // this.activeModal.close();
        },
        error: (error) => {
          Swal.fire('Error al enviar reseña', 'Hubo un error al enviar la reseña. Intenta nuevamente.', 'error');
          console.error(error);
          // this.errorMessage = 'Hubo un error al enviar la reseña. Intenta nuevamente.';
        }
      });
    }
  }

  marcarIdProducto(idProducto: number): void {
    this.id_producto = idProducto;
  }

}
