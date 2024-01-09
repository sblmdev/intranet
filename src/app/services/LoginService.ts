import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
<<<<<<< HEAD
  private baseUrl = 'http://192.168.1.6:8080/intranet-api/api/usuarios';
=======
  private baseUrl = 'http://localhost:8088/api/usuarios';
>>>>>>> 3e35de59c4e408c5fc9deb86d6630f9c4cb27893

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Usuario> {
    const url = `${this.baseUrl}/buscarPorUsernameYContrasena/${username}/${password}`;
    return this.http.get<Usuario>(url);
  }
}