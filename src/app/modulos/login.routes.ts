import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { HomePageComponent } from "./login/home-page/home-page.component";
import { UsuariosRegistrarComponent } from "./usuarios/usuarios-registrar/usuarios-registrar.component";
import { NotfoundComponent } from "../shared/notfound/notfound.component";
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosAdministradorComponent } from "./usuarios/usuarios-administrador/usuarios-administrador.component";
import { UsuariosArtesanoComponent } from "./usuarios/usuarios-artesano/usuarios-artesano.component";
import { ProductosPageComponent } from "./productos/productos-page/productos-page.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPageComponent,
         
    },
    {
        path: 'home',
        component: HomePageComponent,
        // canActivate: [AuthGuard]
        
    },
    {
        path: 'registrar',
        component: UsuariosRegistrarComponent,
    },
    {
        path: 'administrador',
        component: UsuariosAdministradorComponent,
    },
    {
        path: 'artesano',
        component: UsuariosArtesanoComponent,
    },
    {
        path: 'productos',
        component: ProductosPageComponent,
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];