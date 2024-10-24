import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  // Agregar producto al carrito
  agregarProductoCarrito(id_producto: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito/agregar`, { id_producto, cantidad });
  }

  // Listar productos del carrito
  listarProductosCarrito(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrito/listar`);
  }

  // Eliminar producto del carrito
  eliminarProducto(id_producto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/eliminar/${id_producto}`);
  }
}
