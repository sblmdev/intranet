import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentRecomendation } from 'src/app/models/documentoRecomendacion';
import { Recomendation } from 'src/app/models/recomendation';
import { Unidad } from 'src/app/models/unidad';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
import { DocumentRecomendationService } from 'src/app/services/documentRecomendation.service';
import { FileService } from 'src/app/services/file.service';
import { RecomendationService } from 'src/app/services/recomendation.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  unidades: Unidad[] = [];
  contador: number = 0;

  fechaDoc: string = '';
  medio: string = '';
  dniBuscado = '';

  submit:boolean=false;
  documentFlag: boolean = false;
  medioFlag: boolean = false;
  userFlag: boolean = false;
  unidadFlag: boolean = false;

  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  usuariosSeleccionados: Usuario[] = [];
  unidadesSeleccionadas: string[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService,
    private appService: AppService, 
    private recomendationService: RecomendationService,
    private documentRecomendacionService: DocumentRecomendationService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private unidadService: UnidadService) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.clearData();
    this.usuario = this.appService.getUsuario();
    this.unidadService.obtenerTodosUnidades().subscribe({
      next: (data) => {
        this.unidades = data;
        console.log(this.unidades);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  clearData() {
    this.recomendation = new Recomendation();
    this.usuarioService.obtenerTodosUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.filter(u =>  u.estado);
        if (this.id != 0) {
          this.recomendationService.getRecomendationById(this.id).subscribe({
            next: (data) => {
              this.recomendation = JSON.parse(JSON.stringify(data));
              this.recomendationOld = JSON.parse(JSON.stringify(data));
              let array = this.recomendation.dniResponsable.split("/");
              for(let j = 0; j < array.length; j++){  
                let us = this.usuarios.find(n => n.dni ==  array[j]);
                if(us != undefined){
                  this.usuariosSeleccionados.push(us);
                }
              }
            },
            error: (e) => {
              console.log(e);
            }
          });
          this.getDocuments();
        }
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  guardar() {
    if(this.id == 0){
      let fechaHoy = new Date();
          let año = fechaHoy.getFullYear();
          let mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
          let dia = fechaHoy.getDate().toString().padStart(2, '0');
          let fechaHoyString = `${año}-${mes}-${dia}`;
          this.recomendation.fechaCreación = fechaHoyString;
      this.recomendationService.addRecomendation(this.recomendation).subscribe({
        next: (data) => {
          this.toastr.success("Recomendación guardada correctamente", "Éxito");
          this.router.navigate(['/recomendations', data.idPlan]);
        },
        error: (e) => {
          this.toastr.error("Ocurrio un error al guarda la Recomendación", "Error");
          console.log(e);
        }
      });
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
              this.toastr.success("Recomendación actualizada correctamente", "Éxito");
              this.router.navigate(['/recomendations', data2.idPlan]);
              this.recomendation = JSON.parse(JSON.stringify(data2));
              this.recomendationOld = JSON.parse(JSON.stringify(data2));
            }
          });
        },
        error: (e1) => {
          this.toastr.error("Ocurrio un error al actualizar la Recomendación", "Error");
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

  closeNewUser() {
    this.userFlag = false;
    this.recomendation.dniResponsable = '';
    this.recomendation.nombresResponsable = '';
    if(this.usuariosSeleccionados.length != 0){
      for(let i = 0; i < this.usuariosSeleccionados.length; i++){
        if(i != 0){
          this.recomendation.dniResponsable = this.recomendation.dniResponsable + "/" + this.usuariosSeleccionados[i].dni;
          this.recomendation.nombresResponsable = this.recomendation.nombresResponsable + "/" + this.usuariosSeleccionados[i].nombres + " " + this.usuariosSeleccionados[i].apellidos;
        }
        else{
          this.recomendation.dniResponsable = this.usuariosSeleccionados[i].dni;
          this.recomendation.nombresResponsable = this.usuariosSeleccionados[i].nombres + " " + this.usuariosSeleccionados[i].apellidos;
        }
      }
    }
  }

  openNewUser() {
    this.userFlag = true;
  }

  searchUser() {
    if(this.dniBuscado.length != 0){
      let usuario = this.usuarios.find(u => u.dni ==  this.dniBuscado);
      if(usuario == undefined){
        this.toastr.error('No se encontró información', 'Error');
      }
      else{
        this.toastr.success('Se encontró una coincidencia', 'Éxito');
        let encontrado = false;
        for(let i = 0; i < this.usuariosSeleccionados.length; i++){
          if(this.usuariosSeleccionados[i].dni == this.dniBuscado){
            encontrado = true;
          }
        }
        this.dniBuscado = '';
        if(!encontrado){
          this.usuariosSeleccionados.push(usuario);
        }
      }
    }
  }

  deleteUser(index: number){
    this.usuariosSeleccionados.splice(index, 1);
  }

  openNewUnidad() {
    this.unidadFlag = true;
  }

  closeNewUnidad() {
    this.unidadFlag = false;
  }

  seleccionarUnidad(nombre: string, e: any) {
    if (e.target.checked) {
      const indice = this.unidadesSeleccionadas.indexOf(nombre);
      if (indice === -1) {
        this.unidadesSeleccionadas.push(nombre);
      }
    } else {
      const indice = this.unidadesSeleccionadas.indexOf(nombre);
      if (indice !== -1) {
        this.unidadesSeleccionadas.splice(indice, 1);
      }
    }
    
    this.recomendation.unidadResponsable = '';
    for(let i = 0; i < this.unidadesSeleccionadas.length; i++) {
      if(i == 0){
        this.recomendation.unidadResponsable = this.recomendation.unidadResponsable + this.unidadesSeleccionadas[i]
      }
      else{
        this.recomendation.unidadResponsable = this.recomendation.unidadResponsable + "/" + this.unidadesSeleccionadas[i];
      }
    }
  }
}
