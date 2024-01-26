import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Publication } from 'src/app/models/publications';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
import { PublicationService } from 'src/app/services/publication.service';
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

  usuario: Usuario = new Usuario();

  constructor(private router: Router, private publicationService: PublicationService, private appService: AppService) {
  }

  ngOnInit() {
    this.publicationService.obtenerPublicacionesPorTipo("Eventos").subscribe({
      next: (data) => {
        this.publicationsEventos = data;
      },
      error: (_error) => {
        console.log(_error);
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

  abrirPublicaciones(): void {
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

}