import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
<<<<<<< HEAD
  private baseUrl = 'http://192.168.1.6:8080'; // Reemplaza con la URL de tu backend
=======
  private baseUrl = 'http://localhost:8088'; // Reemplaza con la URL de tu backend
>>>>>>> 3e35de59c4e408c5fc9deb86d6630f9c4cb27893

  constructor(private http: HttpClient) { }

  uploadFile(file: File, tipo: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    return this.http.post<string>(`${this.baseUrl}/api/files/${tipo}`, formData, { headers });
  }
}