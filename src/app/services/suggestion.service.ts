import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private baseUrl = 'http://192.168.1.6:8080/intranet-api/api/sugerencias';

  constructor(private http: HttpClient) {}

  obtenerTodosSugerencias(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.baseUrl);
  }

  obtenerSugerenciaPorId(id: number): Observable<Suggestion> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Suggestion>(url);
  }

  crearSugerencia(Suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.baseUrl, Suggestion);
  }

  actualizarSugerencia(id: number, Suggestion: Suggestion): Observable<Suggestion> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Suggestion>(url, Suggestion);
  }

  eliminarSugerencia(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
