import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Publication } from 'src/app/models/publications';
import { TypePublication } from 'src/app/models/typePublication';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
import { PublicationService } from 'src/app/services/publication.service';
import { TypeTypePublicationService } from 'src/app/services/typePublication.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  misionFlag: boolean = false;
  visionFlag: boolean = false;
  controlFlag: boolean = false;
  orgFlag: boolean = false;
  valoresFlag: boolean = false;

  publicationsManuales: Publication[] = [];
  publicationsEventos: Publication[] = [];
  tipos: TypePublication[] = [];

  usuario: Usuario = new Usuario();


  constructor(private router: Router, 
    private publicationService: PublicationService, 
    private appService: AppService,
    private typePublicationService: TypeTypePublicationService) {
  }

  ngOnInit() {
    this.publicationService.obtenerPublicacionesPorTipo("Eventos").subscribe({
      next: (data) => {
        this.publicationsEventos = data;
        let fechaHoy = new Date();
        let año = fechaHoy.getFullYear();
        let mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        let dia = fechaHoy.getDate().toString().padStart(2, '0');
        let fechaHoyString = `${año}-${mes}-${dia}`;
        const fechasPosteriores: Publication[] = [];
        this.publicationsEventos.forEach((p) => {
          if (p.fechaEvento > fechaHoyString) {
            fechasPosteriores.push(p);
          }
        })
        this.publicationsEventos = JSON.parse(JSON.stringify(fechasPosteriores));
      },
      error: (_error) => {
        console.log(_error);
      }
    });

    this.typePublicationService.getTypePublications().subscribe({
      next: (data) => {
        this.tipos = data;
        this.tipos.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
      },
      error: (e) => {
        console.log(e);
      }
    });
    
    this.usuario = this.appService.getUsuario();
  }

  fullscreen = false;

  toggleMision(): boolean {
    this.misionFlag = !this.misionFlag
    return this.misionFlag
  }

  toggleVision(): boolean {
    this.visionFlag = !this.visionFlag
    return this.visionFlag
  }

  toggleControl(): boolean {
    this.controlFlag = !this.controlFlag
    return this.controlFlag
  }

  toggleOrg(): boolean {
    this.orgFlag = !this.orgFlag
    return this.orgFlag

  }
  toggleValores(): boolean {
    this.valoresFlag = !this.valoresFlag
    return this.valoresFlag
  }

  goPublications(): void {
    this.router.navigate(['/publication']);
  }

  goDocuments(title: string) {
    this.router.navigate(['/documents', title]);
  }

  goPhoneBook() {
    this.router.navigate(['/phonebook']);
  }

  goDirectorateMembers() {
    this.router.navigate(['/directorate']);
  }

  goPlans() {
    this.router.navigate(['/plans']);
  }

  goRRHH() {
    this.router.navigate(['/rrhh']);
  }

  goToNewsDetail(id: number) {
    this.router.navigate([`/new/${id}`]);
  }

}