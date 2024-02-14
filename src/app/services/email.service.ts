import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl = 'http://19.168.1.6:8080/intranet-api/api/email';

  constructor(private http: HttpClient) { }

  sendEmail(idPublicacion: number): Observable<Usuario> {
    const url = `${this.baseUrl}/sendEmail/${idPublicacion}`;
    return this.http.get<Usuario>(url);
  }

}