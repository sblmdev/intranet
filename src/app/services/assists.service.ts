import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssistTime } from '../models/assistantTime';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AssistsService {

  private baseUrl = 'http://19.168.1.6:8080/intranet-api/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  searchAsistant(dni: string, month: string, year: string): Observable<AssistTime[]> {
    const url = `${this.baseUrl}/asistencias/${dni}/${month}/${year}`;
    return this.http.get<AssistTime[]>(url);
  }

  getPersonalByDependencia(dependencia: string): Observable<Usuario[]> {
    const url = `${this.baseUrl}/usuarios/getByDependencia/${dependencia}`;
    return this.http.get<Usuario[]>(url);
  }
  getPersonalByDNI(dni: string): Observable<any>{
    const url = `${this.baseUrl}/trabajador/${dni}`;
    return this.http.get<Usuario>(url);
  }
  

}
