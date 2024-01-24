import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanvasJS } from '@canvasjs/angular-charts';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan';
import { Recomendation } from 'src/app/models/recomendation';
import { PlanService } from 'src/app/services/plan.service';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css']
})
export class RecomendationsComponent {
  id: number;
  recomendations: Recomendation[] = [];
  recomendationsFilter: Recomendation[] = [];
  nuevoFlag: boolean=false;
  recomendation: Recomendation = new Recomendation();
  plan: Plan = new Plan();
  p:any;

  altas: number = 0;
  medias: number = 0;
  bajas: number = 0;

  asignadas: number = 0;
  sinAsignar: number = 0;

  fechas: number = 0;
  sinFechas: number = 0;

  contadorVencido: number = 0;
  contadorPorExpirar: number = 0;
  contadorOk: number = 0;

  chartOptions: any;
  chartOptions2: any;
  chartOptions3: any;
  chartOptions4: any;

  graficos: boolean = false;

  filtroAreas: string[] = [];
  filtroRiesgo: string[] = ["Alto", "Medio", "Bajo"];
  filtroFecha: string[] = ["En proceso", "Por vencer", "Vencido"];

  areaSeleccionada: string = '';
  riesgoSeleccionado: string = '';
  fechaSeleccionada: string = '';
  graficoSeleccionado: number = 1;

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private planService: PlanService, 
    private recomendationService: RecomendationService,
    private toastr: ToastrService) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.clearData();
  }

  toggleNuevo() {
    this.nuevoFlag=true;
    this.recomendation = new Recomendation();
  }

  closetoggleNuevo() {
    this.clearData();
  }

  openGrafico() {
    this.graficos = true;
  }

  closeGrafico(){
    this.graficos = false;
  }

  saveRecomendation(){
    this.recomendationService.addRecomendation(this.recomendation).subscribe({
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

  clearData(){
    this.recomendation = new Recomendation();
    this.nuevoFlag = false;
    
    this.recomendationService.getRecomendationesByIdPlan(this.id).subscribe({
      next: (data) => {
        this.recomendations = JSON.parse(JSON.stringify(data));
        this.recomendationsFilter = JSON.parse(JSON.stringify(data));
        this.filtroAreas = [];
        for (const recomendacion of this.recomendations) {
          let areasAux = recomendacion.unidadResponsable.split('/');
          for(const areaAux of areasAux){
            this.filtroAreas.push(areaAux);
          }
        }

        this.filtroAreas = Array.from(new Set(this.filtroAreas)).sort();

        this.definirGraficos();
      },
      error: (_error) => {
        console.log(_error);
      }
    });

    this.planService.getPlanById(this.id).subscribe({
      next: (datplan) => {
        this.plan = datplan;
      },
      error: (_er) =>{
        this.plan = new Plan();
        console.log(_er);
      }
    });
  }

  deleteRecomendation(id: number) {
    this.recomendationService.deleteRecomendation(id).subscribe({
      next: (data) => {
        this.clearData();
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  navegarARecomendacion(itemId: number): void {
    this.router.navigate(['/recomendation', itemId]);
  }

  filtrar() {
    if(this.areaSeleccionada.length == 0 && this.riesgoSeleccionado.length == 0 && this.fechaSeleccionada.length == 0){
      this.recomendations = JSON.parse(JSON.stringify(this.recomendationsFilter));
    }
    else{
      this.recomendations = JSON.parse(JSON.stringify(this.recomendationsFilter));
      if(this.areaSeleccionada.length != 0){
        this.recomendations = this.recomendationsFilter.filter(r => r.unidadResponsable.includes(this.areaSeleccionada));
      }
      if(this.riesgoSeleccionado.length != 0){
        switch(this.riesgoSeleccionado) {
          case 'Alto': this.recomendations = this.recomendations.filter(r => r.nivelRiesgo==3); break;
          case 'Medio': this.recomendations = this.recomendations.filter(r => r.nivelRiesgo==2); break;
          case 'Bajo': this.recomendations = this.recomendations.filter(r => r.nivelRiesgo==1); break;
        }
      }
    }
    this.definirGraficos();
  }

  definirGraficos() {
    this.altas = 0;
    this.medias = 0;
    this.bajas = 0;

    this.asignadas = 0;
    this.sinAsignar = 0;

    this.fechas = 0;
    this.sinFechas = 0;

    this.contadorPorExpirar = 0;
    this.contadorVencido = 0;
    this.contadorOk = 0;

    let fechaHoy = new Date();
    let año = fechaHoy.getFullYear();
    let mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
    let dia = fechaHoy.getDate().toString().padStart(2, '0');
    let fechaHoyString = `${año}-${mes}-${dia}`;

    for(const recomendacion of this.recomendations) {
      switch(recomendacion.nivelRiesgo) {
        case 1: this.bajas++; break;
        case 2: this.medias++; break;
        case 3: this.altas++; break;
      }

      if(recomendacion.nombresResponsable == undefined || recomendacion.nombresResponsable == null || recomendacion.nombresResponsable.length == 0){
        this.sinAsignar++;
      }
      else{
        this.asignadas++
      }

      if(recomendacion.fechaFinal == undefined || recomendacion.fechaFinal == null || recomendacion.fechaFinal.length == 0){
        this.sinFechas++
      }
      else{
        this.fechas++;

        let fechaFin = new Date(recomendacion.fechaFinal);
        fechaHoy = new Date(fechaHoyString);

        let diferenciaEnMilisegundos = fechaFin.getTime() - fechaHoy.getTime();
        let diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 3600 * 24);

        if (diferenciaEnDias < 0) {
          this.contadorVencido++;
        } else if (diferenciaEnDias >= 0 && diferenciaEnDias <= 14) {
          this.contadorPorExpirar++;
        } else {
          this.contadorOk++;
        }
      }
    }

    CanvasJS.addColorSet("colorRiesgos",["rgb(220 38 38)","rgb(252 211 77)","rgb(74 222 128)"]);
    CanvasJS.addColorSet("colorSino",["rgb(74 222 128)","rgb(220 38 38)"]);
    this.chartOptions = {
      animationEnabled: true,
      colorSet: "colorRiesgos",
      title: {
        text: "Observaciones por nivel de riesgo - " + this.recomendations.length + " Observaciones"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: this.altas * 100 / this.recomendations.length, name: "Alta (" + this.altas + "/" + this.recomendations.length + ")" },
          { y: this.medias * 100 / this.recomendations.length, name: "Media (" + this.medias + "/" + this.recomendations.length + ")" },
          { y: this.bajas * 100 / this.recomendations.length, name: "Baja (" + this.bajas + "/" + this.recomendations.length + ")" },
        ]
      }]
    };

    this.chartOptions2 = {
      animationEnabled: true,
      colorSet: "colorSino",
      title: {
      text: "Observaciones por asignación de áreas - " + this.recomendations.length + " Observaciones"
      },
      data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: this.asignadas*100/this.recomendations.length, name: "Asignadas (" + this.asignadas + "/" +  this.recomendations.length + ")"},
        { y: this.sinAsignar*100/this.recomendations.length, name: "Sin asignar (" + this.sinAsignar + "/" +  this.recomendations.length + ")"},
      ]
      }]
    }

    this.chartOptions3 = {
      animationEnabled: true,
      colorSet: "colorSino",
      title: {
      text: "Observaciones por asignación de fechas - " + this.recomendations.length + " Observaciones"
      },
      data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: this.fechas*100/this.recomendations.length, name: "Con fecha final (" + this.fechas + "/" +  this.recomendations.length + ")"},
        { y: this.sinFechas*100/this.recomendations.length, name: "Sin fecha final (" + this.sinFechas + "/" +  this.recomendations.length + ")"},
      ]
      }]
    }

    this.chartOptions4 = {
      animationEnabled: true,
      title: {
      text: "Estado de fechas - " + this.fechas + " Recomendaciones"
      },
      data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###.##'%'",
      dataPoints: [
        { y: this.contadorOk*100/this.fechas, name: "En proceso (" + this.contadorOk + "/" +  this.fechas + ")"},
        { y: this.contadorVencido*100/this.fechas, name: "Vencidos (" + this.contadorVencido + "/" +  this.fechas + ")"},
        { y: this.contadorPorExpirar*100/this.fechas, name: "Por expirar (" + this.contadorPorExpirar + "/" +  this.fechas + ")"},
      ]
      }]
    }
  }

  cambiarGrafico(item: number) {
    this.graficoSeleccionado = item;
  }

}
