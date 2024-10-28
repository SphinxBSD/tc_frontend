import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos/productos.service';


interface ProductoCalificado {
  id_producto: number;
  review: any;
  promedio: number;
}

@Component({
  selector: 'app-reviews-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './reviews-modal.component.html',
  styleUrl: './reviews-modal.component.css'
})
export class ReviewsModalComponent {
  @Input() reviewsProducto!: any;
    

    productoReview!: ProductoCalificado;

  constructor(private productosService: ProductosService) {
    
  }


}
