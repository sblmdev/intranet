import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {
  }

  goToNews() {
    this.router.navigate(['/', 'news']);
  }
  goToAssists() {
    this.router.navigate(['/', 'assists']);
  }
  goToEvaluations() {
    this.router.navigate(['/', 'evaluations']);
  }
}
