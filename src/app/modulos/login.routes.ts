import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { HomePageComponent } from "./login/home-page/home-page.component";
import { UsuariosRegistrarComponent } from "./usuarios/usuarios-registrar/usuarios-registrar.component";
import { NotfoundComponent } from "../shared/notfound/notfound.component";
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosAdministradorComponent } from "./usuarios/usuarios-administrador/usuarios-administrador.component";
import { UsuariosArtesanoComponent } from "./usuarios/usuarios-artesano/usuarios-artesano.component";
import { ProductosPageComponent } from "./productos/productos-page/productos-page.component";
import { AboutComponent } from "./aboutus/about/about.component";

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
        
        
    },
    {
        path: 'registrar',
        component: UsuariosRegistrarComponent,
    },
    {
        path: 'administrador',
        component: UsuariosAdministradorComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'artesano',
        component: UsuariosArtesanoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'productos',
        component: ProductosPageComponent,
    },
    {
        path: 'aboutus',
        component: AboutComponent,
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];