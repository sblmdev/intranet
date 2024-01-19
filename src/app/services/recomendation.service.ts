import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendation } from '../models/recomendation';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {
  private apiUrl = 'http://192.168.1.6:8080/intranet-api/api/recomendaciones';

  constructor(private http: HttpClient) {}

  getRecomendationes(): Observable<Recomendation[]> {
    return this.http.get<Recomendation[]>(this.apiUrl);
  }

  getRecomendationesByIdPlan(idPlan: number): Observable<Recomendation[]> {
    return this.http.get<Recomendation[]>(`${this.apiUrl}/getByPlan/${idPlan}`);
  }

  getRecomendationById(id: number): Observable<Recomendation> {
    return this.http.get<Recomendation>(`${this.apiUrl}/${id}`);
  }

  addRecomendation(Recomendation: Recomendation): Observable<Recomendation> {
    return this.http.post<Recomendation>(this.apiUrl, Recomendation);
  }

  updateRecomendation(Recomendation: Recomendation): Observable<Recomendation> {
    return this.http.put<Recomendation>(`${this.apiUrl}/${Recomendation.id}`, Recomendation);
  }

  deleteRecomendation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
