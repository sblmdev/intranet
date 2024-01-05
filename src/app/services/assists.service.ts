import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssistTime } from '../models/assistantTime';

@Injectable({
  providedIn: 'root'
})
export class AssistsService {

  private baseUrl = 'http://192.168.1.6:8088/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  searchAsistant(dni: string, month: string, year: string): Observable<AssistTime[]> {
    const url = `${this.baseUrl}/asistencias/${dni}/${month}/${year}`;
    return this.http.get<AssistTime[]>(url);
  }

}
