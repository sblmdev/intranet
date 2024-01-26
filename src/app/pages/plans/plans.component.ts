import { Component, ElementRef, ViewChild } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RecomendationService } from 'src/app/services/recomendation.service';
import { Recomendation } from 'src/app/models/recomendation';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  nuevoFlag: boolean = false;
  plan: Plan = new Plan();
  plans: Plan[] = [];
  p: any;
  opciones: string[] = [
    "TIPO DE AUDITORIA 1",
    "TIPO DE AUDITORIA 2",
    "TIPO DE AUDITORIA 3",
    "TIPO DE AUDITORIA 4"
  ];
  archivoSeleccionado: File | undefined;
  usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private planService: PlanService,
    private appService: AppService,
    private recomendationService: RecomendationService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.clearData();
    this.usuario = this.appService.getUsuario();
  }

  toggleNuevo() {
    this.nuevoFlag = true;
    this.plan = new Plan();
    this.plan.entidad = "SOCIEDAD DE BENEFICENCIA DE LIMA METROPOLITANA";
  }

  /*onFileSelected(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  cargarData(): void {
    if (this.archivoSeleccionado) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent: string = reader.result as string;
        this.procesarData(fileContent);
      };
      reader.readAsText(this.archivoSeleccionado);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  procesarData(fileContent: string): void {
    const dataArray: any[] = JSON.parse(fileContent);
    dataArray.forEach((item) => {
      const rec: Recomendation = {
        id: item.id,
        idPlan: item.idPlan,
        numero: item.numero,
        observacion: item.observacion,
        nivelRiesgo: item.nivelRiesgo,
        recomendacion: item.recomendacion,
        acciones: item.acciones,
        medio: item.medio,
        fechaFinal: item.fechaFinal,
        unidadResponsable: item.unidadResponsable,
        documentoUnidadResponsable: item.documentoUnidadResponsable,
        dniResponsable: item.dniResponsable,
        nombresResponsable: item.nombresResponsable,
        observacionRiesgos: item.observacionRiesgos,
        estado: true
      }
      console.log('Cargando...', rec);
      this.recomendationService.addRecomendation(rec).subscribe({
        next: (respuesta) => {
          console.log('Respuesta del servicio:', respuesta);
        },
        error: (error) => {
          console.error('Error en el servicio:', error);
        }
      });
    });
  }*/

  closetoggleNuevo() {
    this.clearData();
  }

  savePublication() {
    this.planService.addPlan(this.plan).subscribe({
      next: (data2) => {
        this.toastr.success('El Plan de acción se guardó correctamente', 'Éxito');
        this.clearData();
      },
      error: (error2) => {
        this.toastr.success('El Plan de acción no se guardó correctamente', 'Error');
        console.log(error2);
      }
    });
  }

  clearData() {
    this.plan = new Plan();
    this.nuevoFlag = false;
    this.planService.getPlanes().subscribe({
      next: (data) => {
        this.plans = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  deletePublication(id: number) {
    this.planService.deletePlan(id).subscribe({
      next: (data) => {
        this.clearData();
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  getRecomendations(idPlan: number) {
    this.router.navigate(['/recomendations', idPlan]);
  }

}
