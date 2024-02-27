import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentRecomendation } from '../models/documentoRecomendacion';

@Injectable({
  providedIn: 'root',
})
export class DocumentRecomendationService {
  private apiUrl = 'http://192.168.1.6:8080/intranet-api/api/documentosRec'; 

  constructor(private http: HttpClient) {}

  getDocumentsByIdNumero(numero: number, idPlan: number): Observable<DocumentRecomendation[]> {
    return this.http.get<DocumentRecomendation[]>(`${this.apiUrl}/${numero}/${idPlan}`);
  }

  deleteDocument(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
