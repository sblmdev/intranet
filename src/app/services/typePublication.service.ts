import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TypePublication } from "../models/typePublication";

@Injectable({
  providedIn: "root"
})
export class TypeTypePublicationService {

  private apiUrl = "http://19.168.1.6:8080/intranet-api/api/tipoPublicaciones";

  constructor(private http: HttpClient) { }

  getTypePublications(): Observable<TypePublication[]> {
    return this.http.get<TypePublication[]>(`${this.apiUrl}`);
  }

  getTypePublicationById(id: number): Observable<TypePublication> {
    return this.http.get<TypePublication>(`${this.apiUrl}/${id}`);
  }

  createTypePublication(TypePublication: TypePublication): Observable<TypePublication> {
    return this.http.post<TypePublication>(`${this.apiUrl}`, TypePublication);
  }

  updateTypePublication(id: number, TypePublication: TypePublication): Observable<TypePublication> {
    return this.http.put<TypePublication>(`${this.apiUrl}/${id}`, TypePublication);
  }

  deleteTypePublication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}