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
  user_dni:number=0;
  user_dependency:string='';
  user_area:string='';
  user_location:string='';
  user_telf:string=''
  user_position:string='';
  user_regime:string=''
  enviarEvento() {
    this.evento.emit('Hola desde el hijo');
  }
  documents:string[] = [];
}
