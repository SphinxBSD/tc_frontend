import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login/login-page/login-page.component";
import { HomePageComponent } from "./login/home-page/home-page.component";

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
    }
];