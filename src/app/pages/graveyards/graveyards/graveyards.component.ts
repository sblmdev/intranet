import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graveyards',
  templateUrl: './graveyards.component.html',
  styleUrls: ['./graveyards.component.css']
})
export class GraveyardsComponent {
  ruta = 1;
  constructor(private router: Router) {
  }

  goToReservations() {
    this.ruta = 1;
    this.router.navigate(['/', 'reservations']);
  }
}
