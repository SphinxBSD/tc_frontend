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
import { UsuariosCompradorComponent } from "./usuarios/usuarios-comprador/usuarios-comprador.component";
import { ComunidadesComponent } from "./comunidades/comunidades/comunidades.component";
import { UsuariosSuperadminComponent } from "./usuarios/usuarios-superadmin/usuarios-superadmin.component";
import { UsuariosDeliveryComponent } from "./usuarios/usuarios-delivery/usuarios-delivery.component";

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
        path: 'comprador',
        component: UsuariosCompradorComponent,
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
        path: 'comunidades',
        component: ComunidadesComponent,
    },
    {
        path: 'superadmin',
        component: UsuariosSuperadminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'delivery',
        component: UsuariosDeliveryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];