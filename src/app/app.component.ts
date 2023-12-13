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
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Lógica para determinar si mostrar el sidebar según la ruta actual
        // Puedes ajustar esta lógica según tus necesidades
        // Aquí estoy usando una ruta de ejemplo ("/dashboard") como condición
        this.mostrarSidebar();
        this.mostrarNavbar();
      }
    });
  }
  ngOnInit(){
    let token = sessionStorage.getItem("Token");
    if(token != null && token != undefined ){
      this.isLoggedIn = true;
    }
  }
  mostrarSidebar():boolean{
    return this.isLoggedIn && this.router.url === '/publication';
  }
  mostrarNavbar():boolean{
    return this.isLoggedIn && this.router.url === '/publication';
  }
}
