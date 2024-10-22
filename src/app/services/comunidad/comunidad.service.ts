import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Comunidad } from '../../models/comunidad.model';
import { Comunario } from '../../models/comunario.model';

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

  // Método para obtener las comunidades asociadas al usuario
  getComunidadesByUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comunidad/comunidades/usuario`);
  }

  getAllComunidades(): Observable<Comunidad[]> {
    return this.http.get<Comunidad[]>(`${this.apiUrl}/comunidad/comunidades`);
  }

  sendSolicitud(id_comunidad: number, id_encargado: number, mensaje: string): Observable<any> {
    const payload = { id_comunidad, id_encargado, mensaje };
    return this.http.post<any>(`${this.apiUrl}/comunidad/solicitar`, payload);
  }

  getSolicitudesByUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comunidad/solicitudes/usuario`);
  }

  getArtesanosComunarios(): Observable<any>{
    return this.http.get<Comunario[]>(`${this.apiUrl}/artesano/comunarios`);
  }

  aprobarSolicitud(id_comunidad: number, id_solicitante: number): Observable<any> {
    const payload = { id_comunidad, id_solicitante };
    return this.http.post<any>(`${this.apiUrl}/comunidad/approve-request`, payload);
  }

  getComunidadesConArtesanos(): Observable<any> {
    return this.http.get(this.apiUrl + '/comunidad/infocomunidades');
  }
}
