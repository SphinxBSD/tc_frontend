import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper!: JwtHelperService;
  // private apiUrl = 'http://localhost:8080/api';  // Cambia la URL si es necesario
  private apiUrl = 'https://tcbackend-production-d459.up.railway.app/api';

  constructor(private http: HttpClient,
          private recaptchaV3Service: ReCaptchaV3Service,
          private cookieService: CookieService
          ) {
            this.jwtHelper = new JwtHelperService();
          }

  login(username: string, password: string, tokenCaptcha: string): Observable<any> {
    const loginData = { username, password, tokenCaptcha };
    console.log('Datos enviados:', loginData);
    return this.http.post(this.apiUrl + '/auth/login', loginData);
  }

  setToken(token: string) {
    // Guarda el token en las cookies
    this.cookieService.set('authToken', token, { path: '/', secure: true, sameSite: 'Strict' });
  }

  getToken() {
    // Obtén el token de las cookies
    return this.cookieService.get('authToken');
  }

  isAuthenticated(): boolean {
    // Verifica si el token está presente
    return !!this.getToken();
  }

  logout() {
    // Elimina el token de las cookies
    this.cookieService.delete('authToken', '/');
  }

  // Método para verificar si el token está expirado
  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  // getProfile() {
  //   const url = `${environment.API_URL}/api/v1/auth/profile`;
  //   return this.http.get<User>(url);
  // }

  recover(username: string, email: string): Observable<any> {
    
    const recoverData = { username, email };
    console.log('Datos enviados:', recoverData);
    return this.http.post(this.apiUrl + '/auth/recover-password', recoverData);
  }

  register(ci:number,
      nombre:string,
      paterno:string,
      materno:string,
      fecha_nac: Date,
      direccion:string,
      telefono: number,
      username:string,
      email:string,
      password:string,
      id_rol:number): Observable<any> {
    
    const registerData = { ci, nombre, paterno, materno, fecha_nac, direccion, telefono, username, email, password, id_rol };
    console.log('Datos enviados:', registerData);
    return this.http.post(this.apiUrl + '/users/registrar', registerData);
  }
}
