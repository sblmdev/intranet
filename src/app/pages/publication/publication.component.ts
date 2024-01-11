import { Component } from '@angular/core';
import { Publication } from 'src/app/models/publications';
import { ChangeDetectorRef } from '@angular/core';
import { PublicationService } from 'src/app/services/publicationService';
import { Usuario } from 'src/app/models/usuario';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
[x: string]: any;
  nuevoFlag: boolean=false;
  publicacion: Publication = new Publication();
  publications: Publication[];
  opcionSeleccionada: string="";
  mostrarCampoFecha: boolean = false;
  fechaSeleccionada: Date=  new Date();
  file: File | undefined;
  p:any;
  constructor(private publicationService: PublicationService,private cdRef: ChangeDetectorRef, private fileService: FileService) {
    this.publications = [];
  }
  
  opciones: string[] = [
    "Comunicaciones",
    "Eventos",
    "Leyes",
    "Resoluciones",
    "Reglamentos",
    "Directivas",
    "Acuerdos",
    "Manuales"
  ];

  ngOnInit() {
    this.clearData();
  }

  toggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    this.publicacion.fechaPublicacion = new Date().toISOString().substring(0,10);
    return this.nuevoFlag
  }

  closetoggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    //this.cdRef.detectChanges();
    return this.nuevoFlag
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      console.log('Archivo seleccionado:', file);
    }
  }
  onOpcionSeleccionadaChange(): void {
    this.mostrarCampoFecha = this.opcionSeleccionada === 'Eventos';
  }

  savePublication(){
    if (this.file) {
      //this.publicacion.fechaPublicacion = new Date().toISOString().substring(0,10);
      this.fileService.uploadFile(this.file, this.publicacion.tipoPublicacion).subscribe({
        next: (data: string) => {
          this.publicacion.urlDocumento = data;
          this.publicationService.createPublication(this.publicacion).subscribe({
            next: (data2) => {
              this.clearData();
            },
            error: (error2) => {
              console.log(error2);
            }
          });
        },
        error: (error1) => {
          this.publicacion.urlDocumento = error1.error.text;
          this.publicationService.createPublication(this.publicacion).subscribe({
            next: (data2) => {
              this.clearData();
            },
            error: (error2) => {
              console.log(error2);
            }
          });
        }
      });
    } else {
      console.log('Error: El archivo es undefined');
    }
  }

  clearData(){
    this.publicacion = new Publication();
    this.file = undefined;
    this.nuevoFlag = false;
    const usuarioString = sessionStorage.getItem("Usuario");
    if (usuarioString !== null) {
      try {
        this.publicacion.gerencia = JSON.parse(usuarioString).dependencia;
      } catch (error) {
        console.error("Error al parsear el objeto Usuario:", error);
      }
    } else {
      console.warn("No se encontró la clave 'Usuario' en sessionStorage.");
    }
    this.publicationService.getPublicationsByGerencia(this.publicacion.gerencia).subscribe({
      next: (data) => {
        this.publications = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  deletePublication(id: number) {
    this.publicationService.deletePublication(id).subscribe({
      next: (data) => {
        this.clearData();
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }
  
}
