import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  cerrarSesion() {
    this.router.navigate(['/']);

    setTimeout(() => {
      sessionStorage.setItem("Token", "");
      window.location.reload();
    }, 1000);
  }
}
