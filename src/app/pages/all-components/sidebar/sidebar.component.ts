import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publicationService';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  misionFlag: boolean = false;
  visionFlag: boolean = false;
  orgFlag: boolean = false;
  valoresFlag: boolean = false;

  publicationsManuales: Publication[] =  [];
  publicationsEventos: Publication[] =  [];

  constructor(private router: Router, private publicationService: PublicationService) {
  }

  ngOnInit() {
    this.publicationService.obtenerPublicacionesPorTipo("Manuales").subscribe({
      next: (data) => {
        this.publicationsManuales = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });

    this.publicationService.obtenerPublicacionesPorTipo("Eventos").subscribe({
      next: (data) => {
        this.publicationsEventos = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  fullscreen = false;
  toggleMision(): boolean{
    this.misionFlag=!this.misionFlag
  return this.misionFlag
  }
  toggleVision(): boolean{
    this.visionFlag=!this.visionFlag
  return this.visionFlag
  }

  toggleOrg(): boolean{
    this.orgFlag=!this.orgFlag
  return this.orgFlag
  
  }
  toggleValores(): boolean{
    this.valoresFlag=!this.valoresFlag
  return this.valoresFlag
  }

  abrirPublicaciones():void{
    const url = '/publication';
    window.open(url, '_blank');
  }

  goDocuments(title: string) {
    const url = `/documents/${title}`;
  window.open(url, '_blank');
  }
}