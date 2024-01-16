import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  template: `
    <p>{{ dni }}</p>
    <button (click)="enviarEvento()">Enviar Evento</button>
  `,
})
export class ProfileComponent {
  @Input() dni: string = '';
  @Output() evento = new EventEmitter<any>();

  enviarEvento() {
    this.evento.emit('Hola desde el hijo');
  }
}
