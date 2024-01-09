import { Component } from '@angular/core';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent {
  terminoBusqueda: string = '';

  buscar() {
    const term = this.terminoBusqueda.toUpperCase();

    const filasTabla = document.querySelectorAll('.table-auto tbody tr');
    filasTabla.forEach((fila) => {
      const celdaUbicacion = fila.querySelector('td:nth-child(5)');

      if (celdaUbicacion) {
        const textoCelda = (celdaUbicacion as HTMLElement).innerText || (celdaUbicacion as HTMLElement).textContent;

        if (textoCelda && textoCelda.toUpperCase().includes(term)) {
          fila.removeAttribute('style');
        } else {
          fila.setAttribute('style', 'display: none');
        }
      }
    });
  }
  
}
