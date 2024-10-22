import { Component, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() usuarioRol: string = '';

  constructor(private router: Router) {}

  redirectTo(): void {
    if (this.usuarioRol === 'Encargado') {
      this.router.navigate(['/auth/administrador']);
    } else if (this.usuarioRol === 'Comprador') {
      this.router.navigate(['/auth/comprador']);
    } else if (this.usuarioRol === 'Artesano') {
      this.router.navigate(['/auth/artesano']);
    } else {
      this.router.navigate(['/auth/home']);
    }
  }
}
