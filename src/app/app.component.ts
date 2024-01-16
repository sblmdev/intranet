import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'intranet';
  isLoggedIn: boolean = false;
  show = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrar();
      }
    });
  
  }

  ngOnInit(){
    let token = sessionStorage.getItem("Token");
    if(token != null && token != undefined && token!=""){
      this.isLoggedIn = true;
    }
  }
  mostrar(){
    this.show = !(this.isLoggedIn && (this.router.url == '/publication' || this.router.url == '/plans' || this.router.url.startsWith('/recomendations/')));
  }
}
