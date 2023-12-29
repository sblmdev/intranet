import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../models/publications";

@Injectable({
  providedIn: "root"
})
export class PublicationService {

  private apiUrl = "http://localhost:8080/api/publicaciones";

  constructor(private http: HttpClient) { }

  // Obtener todas las publicaciones
  getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/publications`);
  }

  // Obtener todas las publicaciones
  getPublicationsByTypePublication(typePublication: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/publications/${typePublication}`);
  }

  // Obtener una publicación por su ID
  getPublicationById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/publications/${id}`);
  }

  // Crear una nueva publicación
  createPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(`${this.apiUrl}/publications`, publication);
  }

  // Actualizar una publicación existente
  updatePublication(id: number, publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiUrl}/publications/${id}`, publication);
  }

  // Eliminar una publicación por su ID
  deletePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/publications/${id}`);
  }

}