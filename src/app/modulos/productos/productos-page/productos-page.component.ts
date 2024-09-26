import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.css'
})
export class ProductosPageComponent {

}
