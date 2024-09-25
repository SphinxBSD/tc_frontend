import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/home',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./modulos/login.routes').then(m => m.routes)
    },
];
