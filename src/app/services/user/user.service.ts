import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api';  // Cambia por la URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener datos del usuario actual
  getUserProfile(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/users/profile`);
  }

  // Actualizar datos del perfil del usuario
  updateUserProfile(user: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/setprofile`, user);
  }
}
