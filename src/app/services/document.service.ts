import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = 'http://localhost:8080/intranet-api/api/documentos'; 

  constructor(private http: HttpClient) {}

  getDocumentsByIdPublication(id: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/${id}`);
  }

}
