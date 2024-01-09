import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8088/api/usuarios';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Usuario> {
    const url = `${this.baseUrl}/buscarPorUsernameYContrasena/${username}/${password}`;
    return this.http.get<Usuario>(url);
  }
}