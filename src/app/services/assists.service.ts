import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssistTime } from '../models/assistantTime';

@Injectable({
  providedIn: 'root'
})
export class AssistsService {

<<<<<<< HEAD
  private baseUrl = 'http://192.168.1.6:8080/intranet-api/api'; // Reemplaza con la URL de tu backend
=======
  private baseUrl = 'http://localhost:8088/api'; // Reemplaza con la URL de tu backend
>>>>>>> 3e35de59c4e408c5fc9deb86d6630f9c4cb27893

  constructor(private http: HttpClient) { }

  searchAsistant(dni: string, month: string, year: string): Observable<AssistTime[]> {
    const url = `${this.baseUrl}/asistencias/${dni}/${month}/${year}`;
    return this.http.get<AssistTime[]>(url);
  }

}
