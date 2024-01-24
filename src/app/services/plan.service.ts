import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private apiUrl = 'http://192.168.1.6:8080/intranet-api/api/planes'; 

  constructor(private http: HttpClient) {}

  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }

  getPlanById(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.apiUrl}/${id}`);
  }

  addPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan);
  }

  updatePlan(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}/${plan.id}`, plan);
  }

  deletePlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}
