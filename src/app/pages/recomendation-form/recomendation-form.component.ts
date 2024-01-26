import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentRecomendation } from 'src/app/models/documentoRecomendacion';
import { Recomendation } from 'src/app/models/recomendation';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
import { DocumentRecomendationService } from 'src/app/services/documentRecomendation.service';
import { FileService } from 'src/app/services/file.service';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-recomendation-form',
  templateUrl: './recomendation-form.component.html',
  styleUrls: ['./recomendation-form.component.css']
})
export class RecomendationFormComponent {
  id: number;
  recomendation: Recomendation = new Recomendation();
  recomendationOld: Recomendation = new Recomendation();
  documents: DocumentRecomendation[] = [];
  files: File[] = [];
  contador: number = 0;

  fechaDoc: string = '';
  medio: string = '';

  submit:boolean=false;
  documentFlag: boolean = false;
  medioFlag: boolean = false;

  usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService,
    private appService: AppService, 
    private recomendationService: RecomendationService,
    private documentRecomendacionService: DocumentRecomendationService,
    private toastr: ToastrService) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.clearData();
    this.usuario = this.appService.getUsuario();
  }

  clearData() {
    this.recomendation = new Recomendation();
    if (this.id != 0) {
      this.recomendationService.getRecomendationById(this.id).subscribe({
        next: (data) => {
          this.recomendation = JSON.parse(JSON.stringify(data));
          this.recomendationOld = JSON.parse(JSON.stringify(data));
        },
        error: (e) => {
          console.log(e);
        }
      });
      this.getDocuments();
    }
  }

  guardar() {
    if(this.id == 0){

    }
    else{
      this.recomendationOld.estado = false;
      this.recomendationService.updateRecomendation(this.recomendationOld).subscribe({
        next: (data1) => {
          let fechaHoy = new Date();
          let año = fechaHoy.getFullYear();
          let mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
          let dia = fechaHoy.getDate().toString().padStart(2, '0');
          let fechaHoyString = `${año}-${mes}-${dia}`;
          this.recomendation.fechaModificacion = fechaHoyString;
          this.recomendation.id = 0;
          this.recomendationService.addRecomendation(this.recomendation).subscribe({
            next: (data2) => {
              //this.router.navigate(['/recomendations', data2.idPlan]);
              this.recomendation = JSON.parse(JSON.stringify(data2));
              this.recomendationOld = JSON.parse(JSON.stringify(data2));
            }
          });
        },
        error: (e1) => {
          console.log(e1);
        }
      });
    }
  }

  openNewDocument() {
    this.documentFlag = true;
  }

  closeNewDocument() {
    this.documentFlag = false;
    this.submit = false;
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
  }

  saveDocument() {
    this.contador = 0;
    this.submit = true;
    if(this.fechaDoc.length != 0 && this.files.length != 0){
      for(let i = 0; i < this.files.length; i++){
        if (this.files[i]) {
          this.fileService.uploadFileRecomendation(this.files[i], "Recomendacion", this.id, this.fechaDoc).subscribe({
            next: (data: string) => {
              this.contador++;
              if(this.contador == this.files.length){
                this.toastr.success('Documento guardado correctamente', 'Éxito');
                this.getDocuments();
                this.closeNewDocument();
              }
            },
            error: (error:any) => {
              this.contador++;
              if(this.contador == this.files.length){
                this.toastr.success('Documento guardado correctamente', 'Éxito');
                this.getDocuments();
                this.closeNewDocument();
              }
            }
          });
        } else {
          console.log('Error: El archivo es undefined');
        }
      }
    }
  }

  getDocuments() {
    this.documentRecomendacionService.getDocumentsByIdRecomendacion(this.id).subscribe({
      next: (dataDoc) => {
        this.documents = dataDoc;
      },
      error: (_e) => {
        console.log(_e);
      }
    });
  }

  openInfo() {
    this.medioFlag = true;
  }

  closeInfo() {
    this.medioFlag = false;
    this.submit = false;
  }

  saveInfo() {
    this.submit = true;
    if(this.medio.length != 0){
      this.recomendationOld.estado = false;
      this.recomendationService.updateRecomendation(this.recomendationOld).subscribe({
        next: (data1) => {
          let fechaHoy = new Date();
          let año = fechaHoy.getFullYear();
          let mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
          let dia = fechaHoy.getDate().toString().padStart(2, '0');
          let fechaHoyString = `${año}-${mes}-${dia}`;
          this.recomendation.fechaModificacion = fechaHoyString;
          this.recomendation.id = 0;
          this.recomendation.medio = this.recomendation.medio + '\n\n' + this.medio;
          this.recomendationService.addRecomendation(this.recomendation).subscribe({
            next: (data2) => {
              //this.router.navigate(['/recomendations', data2.idPlan]);
              this.recomendation = JSON.parse(JSON.stringify(data2));
              this.recomendationOld = JSON.parse(JSON.stringify(data2));
              this.closeInfo();
            }
          });
        },
        error: (e1) => {
          console.log(e1);
        }
      });
    }
  }

}
