import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentRecomendation } from '../models/documentoRecomendacion';

@Injectable({
  providedIn: 'root',
})
export class DocumentRecomendationService {
  private apiUrl = 'http://19.168.1.6:8080/intranet-api/api/documentosRec'; 

  constructor(private http: HttpClient) {}

  getDocumentsByIdRecomendacion(id: number): Observable<DocumentRecomendation[]> {
    return this.http.get<DocumentRecomendation[]>(`${this.apiUrl}/${id}`);
  }

}
