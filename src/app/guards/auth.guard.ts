import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const tokenService = inject(AuthService);
  const routerService = inject(Router);
  const token = tokenService.getToken();
  if (!token) {
    return routerService.createUrlTree(['/auth/home']);
  }
  return true;
};
