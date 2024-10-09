import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ProductosService } from '../../../services/productos/productos.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
http: any;
  constructor(private productosService: ProductosService) { }

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


}
