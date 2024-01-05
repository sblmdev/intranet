import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assist } from '../models/assistant';

@Injectable({
  providedIn: 'root'
})
export class AssistsService {

  private baseUrl = 'http://localhost:8088/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  searchAsistant(dni: string, month: string, year: string): Observable<Assist[]> {
    const url = `${this.baseUrl}/asistencias/${dni}/${month}/${year}`;
    return this.http.get<Assist[]>(url);
  }

}
