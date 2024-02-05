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
  notifications = 0;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrar();
      }
    });
  }

  ngOnInit(){
    let token = localStorage.getItem("Token");
    if(token != null && token != undefined && token!=""){
      this.isLoggedIn = true;
      this.evaluarDiferenciaDeTiempo();
    }

    setInterval(() => {
      this.evaluarDiferenciaDeTiempo();
    },  1 * 60 * 1000);
  }
  mostrar(){
    this.show = !(this.isLoggedIn && (this.router.url == '/publication' || this.router.url == '/plans' || this.router.url.startsWith('/recomendations/')));
  }

  evaluarDiferenciaDeTiempo(): void {
    const fechaSesion = this.getFechaSesion();

    if (fechaSesion) {
      const ahora = new Date();
      const diferenciaEnMilisegundos = ahora.getTime() - fechaSesion;
      const horasPasadas = diferenciaEnMilisegundos / (1000 * 60 * 60 * 10);
      if (horasPasadas >= 8) {
        this.router.navigate(['/']);
        alert("Su sesión ha caducado");
        setTimeout(() => {
          localStorage.setItem("Token", "");
          localStorage.setItem("Usuario", "");
          localStorage.setItem("DateTime", "0");
          window.location.reload();
        }, 1000);
      }
    }
  }

  getFechaSesion(): number {
    const fechaString = localStorage.getItem('DateTime');
    if(fechaString != null || fechaString!='0'){
      return Number(fechaString)
    }
    return 0;
  }
}
