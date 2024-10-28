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

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl+'/users/usuarios');
  }

  // Eliminar un usuario por id
  deleteUsuario(id_usuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/usuarios/${id_usuario}`);
  }

  // Obtener usuarios delivery
  getDelivery(): Observable<any> {
    return this.http.get(this.apiUrl+'/users/usuarios/delivery');
  }


  // Crear un nuevo delivery con contrato
  createDelivery(id_usuario: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('contract', file);
    formData.append('id_usuario', id_usuario.toString());

    return this.http.post(`${this.apiUrl}/users/create-delivery`, formData);
  }

  // Obtener la lista de usuarios con rol delivery
  getDeliveries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/deliveries`);
  }

  getPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/pedidos`);
  }

  getPedidosDelivery(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/pedidos/delivery`);
  }

  confirmarEntrega(id_pedido: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/cambiar-estado-pedido`, { id_pedido, estado: 'entregado' });
  }
  
  cancelarPedido(id_pedido: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/cambiar-estado-pedido`, { id_pedido, estado: 'cancelado' });
  }

  asignarPedido(id_pedido:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/cambiar-estado-pedido`, { id_pedido, estado: 'asignado' });
  }

  getAllPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/all-pedidos`);
  }

  // Asignar delivery al pedido
  asignarDelivery(id_pedido: number, id_delivery: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/asignar-delivery`, { id_pedido, id_delivery });
  }
}
