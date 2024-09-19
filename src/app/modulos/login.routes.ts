import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { HomePageComponent } from "./login/home-page/home-page.component";
import { UsuariosRegistrarComponent } from "./usuarios/usuarios-registrar/usuarios-registrar.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
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
    }
];