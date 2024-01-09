import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8088'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  uploadFile(file: File, tipo: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    return this.http.post<string>(`${this.baseUrl}/api/files/${tipo}`, formData, { headers });
  }
}