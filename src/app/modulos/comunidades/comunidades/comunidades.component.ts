import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ComunidadService } from '../../../services/comunidad/comunidad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comunidades',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './comunidades.component.html',
  styleUrl: './comunidades.component.css'
})
export class ComunidadesComponent {

  comunidades: any[] = [];

  constructor(private comunidadService: ComunidadService) {}

  ngOnInit(): void {
    this.comunidadService.getComunidadesConArtesanos().subscribe({
      next: (data) => {
        this.comunidades = data;
      },
      error: (error) => {
        console.error('Error al obtener comunidades:', error);
      }
    });
  }
}
