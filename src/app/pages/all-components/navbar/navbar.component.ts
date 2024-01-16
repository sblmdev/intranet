import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  ruta: string = '/news';
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ruta = event.url;
      }
    });
  }

  goToNews() {
    this.ruta = '/news';
    this.router.navigate(['/', 'news']);
  }
  goToAssists() {
    this.ruta = '/assists';
    this.router.navigate(['/', 'assists']);
  }
  goToEvaluations() {
    this.ruta = '/evaluations';
    this.router.navigate(['/', 'evaluations']);
  }
  goToGraveyards() {
    this.ruta = '/graveyards';
    this.router.navigate(['/', 'graveyards']);
  }
}
