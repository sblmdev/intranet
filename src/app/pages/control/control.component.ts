import { Component } from '@angular/core';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publication.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent {
  marcos: Publication[] = [];
  orientaciones: Publication[] = [];
  cronogramas: Publication[] = [];
  preguntas: Publication[] = [];

  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
    const marcoObservable = this.publicationService.obtenerPublicacionesPorTipo('Marco');
    const orientacionesObservable = this.publicationService.obtenerPublicacionesPorTipo('Orientaciones');
    const cronogramaObservable = this.publicationService.obtenerPublicacionesPorTipo('Cronograma');
    const preguntasObservable = this.publicationService.obtenerPublicacionesPorTipo('Preguntas');
  
    forkJoin([
      marcoObservable,
      orientacionesObservable,
      cronogramaObservable,
      preguntasObservable
    ]).subscribe({
      next: ([marcos, orientaciones, cronogramas, preguntas]) => {
        this.marcos = marcos;
        this.orientaciones = orientaciones;
        this.cronogramas = cronogramas;
        this.preguntas = preguntas;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
