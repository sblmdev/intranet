import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'intranet';
  isLoggedIn: boolean = false;

  ngOnInit(){
    let token = sessionStorage.getItem("Token");
    if(token != null && token != undefined ){
      this.isLoggedIn = true;
    }
  }
}
