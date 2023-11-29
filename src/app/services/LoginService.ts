import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  private ChuckUrl = "https://api.chucknorris.io/jokes/random";

  constructor(private http: HttpClient) {}

  public getFrase(): Observable<any> {
    return this.http.get<any>(this.ChuckUrl);
  }

  public login(username: string, password: string): boolean {
    if(username == "admin" && password == "admin"){
      return true;
    }
    return false;
  }
}