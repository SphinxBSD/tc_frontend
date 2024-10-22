import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CompradorService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  // Confirmar compra
  confirmarCompra(): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprador/comprar`, {});
  }
  
  // Obtener historial de compras
  getHistorialCompras(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comprador/historial`);
  }
}
