import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private apiUrl = 'http://localhost:8080/api' // Cambia por la URL de tu API

  constructor(private http: HttpClient, private authService: AuthService) {}

  registrarComunidad(formData: FormData): Observable<any> {
    // const token = this.authService.getToken(); // Método para obtener el token de las cookies
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });

    return this.http.post(this.apiUrl + '/comunidad/registrar', formData);
  }

}
