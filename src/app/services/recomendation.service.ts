import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendation } from '../models/recomendation';

@Injectable({
  providedIn: 'root',
})
export class RecomendationService {
  private apiUrl = 'http://localhost:8088/api/recomendaciones';

  constructor(private http: HttpClient) {}

  getRecomendationes(): Observable<Recomendation[]> {
    return this.http.get<Recomendation[]>(this.apiUrl);
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
