import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  nombres: string = '';
  dependencia: string = '';
  usuario: Usuario = new Usuario();

  constructor(private router: Router) {}

  ngOnInit(){
    const usuarioString = sessionStorage.getItem("Usuario");
    if (usuarioString !== null) {
      try {
        this.usuario = JSON.parse(usuarioString);
      } catch (error) {
        console.error("Error al parsear el objeto Usuario:", error);
      }
    } else {
      console.warn("No se encontró la clave 'Usuario' en sessionStorage.");
    }
  }

  goHome() {
    
    this.router.navigate(['/','news']);
    // setTimeout(() => {
    //   window.location.reload();
    // });
    
  }

  cerrarSesion() {
    this.router.navigate(['/']);

    setTimeout(() => {
      sessionStorage.setItem("Token", "");
      sessionStorage.setItem("Usuario", "");
      window.location.reload();
    }, 1000);
  }
}
