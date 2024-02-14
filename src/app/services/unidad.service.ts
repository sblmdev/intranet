import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from '../models/unidad';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private baseUrl = 'http://192.168.1.6:8080/intranet-api/api/unidades';

  constructor(private http: HttpClient) {}

  obtenerTodosUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.baseUrl);
  }

  obtenerUnidadPorId(id: number): Observable<Unidad> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Unidad>(url);
  }

  crearUnidad(Unidad: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(this.baseUrl, Unidad);
  }

  actualizarUnidad(id: number, Unidad: Unidad): Observable<Unidad> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Unidad>(url, Unidad);
  }

  eliminarUnidad(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
