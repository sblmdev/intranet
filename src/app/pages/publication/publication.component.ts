import { Component } from '@angular/core';
import { Publication } from 'src/app/models/publications';
import { Document } from 'src/app/models/documento';
import { PublicationService } from 'src/app/services/publication.service';
import { Usuario } from 'src/app/models/usuario';
import { FileService } from 'src/app/services/file.service';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/services/email.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
[x: string]: any;
  nuevoFlag: boolean=false;
  portadaFlag: boolean=false;
  publicacion: Publication = new Publication();
  publicationCover: Publication = new Publication();
  publications: Publication[] = [];
  documents: Document[] = [];
  opcionSeleccionada: string="";
  mostrarCampoFecha: boolean = false;
  fechaSeleccionada: Date=  new Date();
  files: File[] = [];
  contador: number = 0;
  p:any;
  submit:boolean=false;
  docSelect: string = '';
  constructor(private publicationService: PublicationService,
    private fileService: FileService,
    private emailService: EmailService, 
    private toastr: ToastrService,
    private documentService: DocumentService) {

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
            this.fileService.uploadFilePublication(this.files[i], this.publicacion.tipoPublicacion, data2.id).subscribe({
              next: (data: string) => {
                this.contador++;
                if(this.contador == this.files.length){
                  this.toastr.success('Documentos guardados correctamente', 'Éxito');
                  this.clearData();
                  this.emailService.sendEmail(data2.id).subscribe();
                }
              },
              error: (error:any) => {
                this.contador++;
                if(this.contador == this.files.length){
                  this.toastr.success('Documentos guardados correctamente', 'Éxito');
                  this.clearData();
                  this.emailService.sendEmail(data2.id).subscribe();
                }
              }
            });
          } else {
            console.log('Error: El archivo es undefined');
          }
        }
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

  openSelectCover(pub: Publication) {
    this.portadaFlag = true;
    this.publicationCover = JSON.parse(JSON.stringify(pub));
    this.documents = [];
    this.docSelect = '';
    this.publicationService.getPublicationById(this.publicationCover.id).subscribe({
      next: (data) => {
        this.publicationCover = data;
        this.documentService.getDocumentsByIdPublication(this.publicationCover.id).subscribe({
          next: (data2) => {
            this.documents = data2;
          },
          error: (_e2) => {
            console.log(_e2)
          }
        });
      },
      error: (_e) => {
        console.log(_e);
      }
    });
  }

  closeSelectCover() {
    this.portadaFlag = false;
  }

  selectCover(doc: Document) {
    this.docSelect =  doc.urlDocumento;
  }

  saveCover(){
    if(this.docSelect.length == 0){
      this.toastr.error('Debe seleccionar una imagen como portada', 'Error');
    }
    else{
      this.publicationCover.urlDocumento = this.docSelect;
      this.publicationService.updatePublication(this.publicationCover.id, this.publicationCover).subscribe({
        next: (data) => {
          this.portadaFlag = false;
          this.toastr.success('La portada se guardó correctamente', 'Éxito');
        },
        error: (e_) => {
          this.toastr.error('La portada no se guardó correctamente', 'Error');
        }
      });
    }
  }
  
}
