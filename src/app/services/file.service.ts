import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://192.168.1.6:8080/intranet-api';

  constructor(private http: HttpClient) { }

  uploadFilePublication(file: File, tipo: string, idPublicacion: number): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    return this.http.post<string>(`${this.baseUrl}/api/files/publication/${tipo}/${idPublicacion}`, formData, { headers });
  }

  uploadFileRecomendation(file: File, tipo: string, idRecomendation: number, fecha: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    return this.http.post<string>(`${this.baseUrl}/api/files/recomendation/${tipo}/${idRecomendation}/${fecha}`, formData, { headers });
  }
}