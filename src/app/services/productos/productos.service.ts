import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  getProductos(filters?: any): Observable<any[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.id_categoria) {
        params = params.set('id_categoria', filters.id_categoria);
      }
      if (filters.id_elaboracion) {
        params = params.set('id_elaboracion', filters.id_elaboracion);
      }
    }

    return this.http.get<any[]>(this.apiUrl+'/productos/mostrar', { params });
  }

  registrarProducto(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + '/productos/registrar', formData);
  }

  // Obtener todas las categorías
  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/categorias`);
  }

  // Obtener todas las elaboraciones
  getElaboraciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/elaboraciones`);
  }
}
