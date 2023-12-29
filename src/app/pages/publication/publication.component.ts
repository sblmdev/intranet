import { Component } from '@angular/core';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/PublicationService';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  nuevoFlag: boolean=false;
  publications: Publication[];
  opcionSeleccionada: string="";
  mostrarCampoFecha: boolean = false;
  fechaSeleccionada: Date=  new Date();

  constructor(private publicationService: PublicationService,private cdRef: ChangeDetectorRef) {
    this.publications = [];
  }
  
  opciones: string[] = [
    "Comunicaciones",
    "Eventos",
    "Leyes",
    "Resoluciones",
    "Reglamento",
    "Directivas",
    "Acuerdos",
    "Manuales"
  ];
  unidadesOrganicas = [
    { id: 1, nombre: 'GTI', selected: false },
    { id: 2, nombre: 'GNE', selected: false },
    { id: 3, nombre: 'GPD', selected: false },
  ];
  ngOnInit() {
    this.publicationService.getAllPublications().subscribe({
      next: (data) => {
        this.publications = data;
        console.log(this.publications);
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  toggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    //this.cdRef.detectChanges();
    return this.nuevoFlag
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      console.log('Archivo seleccionado:', file);

    }
  }
  onOpcionSeleccionadaChange(): void {
    this.mostrarCampoFecha = this.opcionSeleccionada === 'Eventos';
  }
  
}
