import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://192.168.1.6:8080/intranet-api/api/usuarios';
  private baseUrlAuth = 'http://192.168.1.6:8080/intranet-api/api/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<Usuario> {
    const url = `${this.baseUrlAuth}/authenticate`;
    const body = { username, password };
    return this.http.post<Usuario>(url, body);
  }

  login2(username: string, password: string): Observable<Usuario> {
    const url = `${this.baseUrl}/buscarPorUsernameYContrasena/${username}/${password}`;
    return this.http.get<Usuario>(url);
  }
}