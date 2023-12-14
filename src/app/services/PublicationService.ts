import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Publication } from "../models/publications";

@Injectable({
  providedIn: "root"
})
export class PublicationService {

  private url = "http://localhost:8080/api/publicaciones";

  constructor(private http: HttpClient) {}

  public getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.url);
  }

}