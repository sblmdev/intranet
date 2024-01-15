import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  ruta = this.router.url;
  constructor(private router: Router) {
  }
  ngOnInit() {
    setTimeout(() => {
      this.ruta = this.router.url;
      console.log(this.ruta);
    });
  }

  goToNews() {
    console.log(this.router.url)
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
