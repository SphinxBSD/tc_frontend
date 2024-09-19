import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';  // Cambia la URL si es necesario

  constructor(private http: HttpClient, private recaptchaV3Service: ReCaptchaV3Service) {}

  login(username: string, password: string, tokenCaptcha: string): Observable<any> {
    const loginData = { username, password, tokenCaptcha };
    console.log('Datos enviados:', loginData);
    return this.http.post(this.apiUrl + '/login', loginData);
  }

  recover(username: string, email: string): Observable<any> {
    
    const recoverData = { username, email };
    console.log('Datos enviados:', recoverData);
    return this.http.post(this.apiUrl + '/recover-password', recoverData);
  }
  // constructor(private http: HttpClient) {}

  // login(username: string, password: string): Observable<any> {
  //   const loginData = { username, password };
  //   return this.http.post<any>(this.apiUrl, loginData);
  // }
}
