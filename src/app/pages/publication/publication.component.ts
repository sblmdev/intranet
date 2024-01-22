import { Component } from '@angular/core';
import { Publication } from 'src/app/models/publications';
import { ChangeDetectorRef } from '@angular/core';
import { PublicationService } from 'src/app/services/publicationService';
import { Usuario } from 'src/app/models/usuario';
import { FileService } from 'src/app/services/file.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
[x: string]: any;
  nuevoFlag: boolean=false;
  publicacion: Publication = new Publication();
  publications: Publication[] = [];
  opcionSeleccionada: string="";
  mostrarCampoFecha: boolean = false;
  fechaSeleccionada: Date=  new Date();
  files: File[] = [];
  contador: number = 0;
  p:any;
  submit:boolean=false;
  constructor(private publicationService: PublicationService,private cdRef: ChangeDetectorRef, private fileService: FileService, private toastr: ToastrService) {

    
  
  }
  
  opciones: any[] = [];

  ngOnInit() {
    this.clearData();
    const usuarioString = localStorage.getItem("Usuario");
    if (usuarioString !== null) {
      try {
        let usuario: Usuario = JSON.parse(usuarioString);
        if(usuario.tipo == 1){
          this.opciones = [
            { option: "Comunicaciones", value: "Comunicaciones" },
            { option: "Eventos", value: "Eventos" },
            { option: "Galería", value: "Galería" },
            { option: "Acuerdos", value: "Acuerdos" },
            { option: "Códigos", value: "Códigos" },
            { option: "Marco", value: "Control Interno - Marco Normativo" },
            { option: "Orientaciones", value: "Control Interno - Orientaciones Prácticas" },
            { option: "Cronograma", value: "Control Interno - Cronograma de Presentación" },
            { option: "Preguntas", value: "Control Interno - Preguntas Frecuentes" },
            { option: "Directivas", value: "Directivas" },
            { option: "Leyes", value: "Leyes" },
            { option: "Lineamientos", value: "Lineamientos" },
            { option: "Manuales", value: "Manuales" },
            { option: "Planes", value: "Planes" },
            { option: "Políticas", value: "Políticas" },
            { option: "Procedimientos", value: "Procedimientos" },
            { option: "Reglamentos", value: "Reglamentos" },
            { option: "Resoluciones", value: "Resoluciones" }
          ];          
        }
        else{
          switch(usuario.dependencia) {
            case 'GAF': 
            this.opciones = [
              { option: "Comunicaciones", value: "Comunicaciones" },
              { option: "Eventos", value: "Eventos" },
              { option: "Galería", value: "Galería" }
            ]; break;
            case 'GPD': 
            this.opciones = [
              { option: "Acuerdos", value: "Acuerdos" },
              { option: "Códigos", value: "Códigos" },
              { option: "Marco", value: "Control Interno - Marco Normativo" },
              { option: "Orientaciones", value: "Control Interno - Orientaciones Prácticas" },
              { option: "Cronograma", value: "Control Interno - Cronograma de Presentación" },
              { option: "Preguntas", value: "Control Interno - Preguntas Frecuentes" },
              { option: "Directivas", value: "Directivas" },
              { option: "Leyes", value: "Leyes" },
              { option: "Lineamientos", value: "Lineamientos" },
              { option: "Manuales", value: "Manuales" },
              { option: "Planes", value: "Planes" },
              { option: "Políticas", value: "Políticas" },
              { option: "Procedimientos", value: "Procedimientos" },
              { option: "Reglamentos", value: "Reglamentos" },
              { option: "Resoluciones", value: "Resoluciones" }
            ];
            ;break;
          }
        }
      } catch (error) {
        console.error("Error al parsear el objeto Usuario:", error);
      }
    } else {
      console.warn("No se encontró la clave 'Usuario' en localStorage.");
    }

  }

  toggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    this.publicacion.fechaPublicacion = new Date().toISOString().substring(0,10);
    this.submit=false
    return this.nuevoFlag
  }

  closetoggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    //this.cdRef.detectChanges();
    this.clearData()
    return this.nuevoFlag
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
  }
  onOpcionSeleccionadaChange(): void {
    this.mostrarCampoFecha = this.opcionSeleccionada === 'Eventos';
  }

  savePublication(){
    this.submit=true
    console.log(this.publicacion.fechaEvento)
    if (this.files.length==0 || this.publicacion.titulo.length==0 || this.publicacion.contenido.length==0 || this.publicacion.fechaPublicacion.length==0
       || this.publicacion.tipoPublicacion.length==0 || (this.publicacion.fechaEvento.length==0 && this.publicacion.tipoPublicacion=='Eventos'))
       {this.toastr.error('Complete los campos faltantes', 'Error');}
    else {
    this.contador = 0;
    this.publicationService.createPublication(this.publicacion).subscribe({
      next: (data2) => {
        this.toastr.success('La Publicación se guardó correctamente', 'Éxito');
        for(let i = 0; i < this.files.length; i++){
          if (this.files[i]) {
            this.fileService.uploadFile(this.files[i], this.publicacion.tipoPublicacion, data2.id).subscribe({
              next: (data: string) => {
                this.contador++;
                if(this.contador == this.files.length){
                  this.toastr.success('Documentos guardados correctamente', 'Éxito');
                  this.clearData();
                }
              },
              error: (error:any) => {
                this.contador++;
                if(this.contador == this.files.length){
                  this.toastr.success('Documentos guardados correctamente', 'Éxito');
                  this.clearData();
                }
              }
            });
          } else {
            console.log('Error: El archivo es undefined');
          }
        }
        this.clearData();
      },
      error: (error2) => {
        this.toastr.error('La Publicación no se guardó correctamente', 'Error');
        console.log(error2);
      }
    });
  }
  }

  clearData(){
    this.submit=false
    this.publicacion = new Publication();
    this.files = [];
    this.nuevoFlag = false;
    const usuarioString = localStorage.getItem("Usuario");
    if (usuarioString !== null) {
      try {
        this.publicacion.gerencia = JSON.parse(usuarioString).dependencia;
        this.publicationService.getPublicationsByGerencia(this.publicacion.gerencia).subscribe({
          next: (data) => {
            this.publications = data;
          },
          error: (_error) => {
            console.log(_error);
          }
        });
      } catch (error) {
        console.error("Error al parsear el objeto Usuario:", error);
      }
    } else {
      console.warn("No se encontró la clave 'Usuario' en localStorage.");
    }
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
