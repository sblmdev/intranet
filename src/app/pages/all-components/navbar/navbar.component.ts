import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  ruta = 1;
  constructor(private router: Router) {
  }

  goToNews() {
    this.ruta = 1;
    this.router.navigate(['/', 'news']);
  }
  goToAssists() {
    this.ruta = 2;
    this.router.navigate(['/', 'assists']);
  }
  goToEvaluations() {
    this.ruta = 3;
    this.router.navigate(['/', 'evaluations']);
  }
  goToGraveyards() {
    this.ruta = 4;
    this.router.navigate(['/', 'graveyards']);
  }
}
