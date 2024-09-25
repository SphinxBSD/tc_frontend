import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  usuarioRol: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.getUserProfile();
  }

  logged = false;

  ngOnInit(): void {
    const token = this.authService.getToken();
    const isExpired = this.authService.isTokenExpired(token);
    if (isExpired){
      this.logged = true;
    }
    console.log('¿El token ha expirado?', isExpired);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  redirectTo(): void {

    if (this.usuarioRol === 'Administrador') {
      this.router.navigate(['/auth/administrador']);
    } else if (this.usuarioRol === 'Comprador') {
      this.router.navigate(['/auth/comprador']);
    } else if (this.usuarioRol === 'Artesano') {
      this.router.navigate(['/auth/artesano']);
    }else{
      this.router.navigate(['/auth/home']);
    }
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data: Usuario) => {
        this.usuarioRol = data.roles;
        console.log('Rol de usuaurio:', this.usuarioRol);
        // console.log('Perfil del usuario:', data);
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    });
  }

}
