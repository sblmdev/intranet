import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../models/publications";

@Injectable({
  providedIn: "root"
})
export class PublicationService {

<<<<<<< HEAD
  private apiUrl = "http://192.168.1.6:8080/intranet-api/api/publicaciones";
=======
  private apiUrl = "http://localhost:8088/api/publicaciones";
>>>>>>> 3e35de59c4e408c5fc9deb86d6630f9c4cb27893

  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}`);
  }

  getPublicationsByGerencia(gerencia: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/all/${gerencia}`);
  }

  obtenerPublicacionesPorTipo(tipo: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/all/por-tipo/${tipo}`);
  }

  getPublicationsByTypePublication(typePublication: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/${typePublication}`);
  }

  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}`);
  }

  createPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(`${this.apiUrl}`, publication);
  }

  updatePublication(id: number, publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiUrl}/${id}`, publication);
  }

  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}