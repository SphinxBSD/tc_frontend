import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  // private apiUrl = 'http://localhost:8080/api';
  private apiUrl = 'https://tcbackend-production-d459.up.railway.app/api';

  constructor(private http: HttpClient) { }

  // Confirmar compra
  confirmarPedido(latitud:number, longitud: number): Observable<any> {

    return this.http.post(`${this.apiUrl}/comprador/comprar`, {latitud, longitud});
  }
  
  // Obtener historial de compras
  getHistorialCompras(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comprador/historial`);
  }
}
