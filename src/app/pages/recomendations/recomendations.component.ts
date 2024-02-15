import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan';
import { Recomendation } from 'src/app/models/recomendation';
import { Usuario } from 'src/app/models/usuario';
import { AppService } from 'src/app/services/app.service';
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

  chartOptionsPye1: any;
  chartOptionsPye2: any;
  chartOptionsPye3: any;
  chartOptionsPye4: any;
  chartOptionsBar1: any;
  chartOptionsBar2: any;
  chartOptionsBar3: any;
  chartOptionsBar4: any;
  chartOptions: any;

  fechaOrigen: string = '2023-01-01';
  fechaDestino: Date = new Date(); 
  diferenciaMeses: number = 0;
  opcionesMeses: number[] = [];
  ultimos: number = 2;

  graficos: boolean = false;
  comparativo: boolean = false;

  filtroAreas: string[] = [];
  filtroRiesgo: string[] = ["Alto", "Medio", "Bajo"];
  filtroFecha: string[] = ["En proceso", "Por vencer", "Vencido"];

  areaSeleccionada: string = '';
  riesgoSeleccionado: string = '';
  fechaSeleccionada: string = '';
  graficoSeleccionado: number = 1;
  tipoGrafico: number = 1;

  usuario: Usuario = new Usuario();

  constructor(private router: Router,
    private route: ActivatedRoute, 
    private planService: PlanService, 
    private recomendationService: RecomendationService,
    private toastr: ToastrService, 
    private appService: AppService) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.clearData();
    this.usuario = this.appService.getUsuario();
    this.calcularDiferenciaMeses();
  }

  calcularDiferenciaMeses() {
    const fechaOrigenObj: Date = new Date(this.fechaOrigen);
    const diferenciaAnios: number = this.fechaDestino.getFullYear() - fechaOrigenObj.getFullYear();
    this.diferenciaMeses = (diferenciaAnios * 12) + this.fechaDestino.getMonth() - fechaOrigenObj.getMonth();
    this.opcionesMeses = Array.from({ length: this.diferenciaMeses - 1 }, (_, index) => index + 2);
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

  openGraficoComparativo() {
    this.comparativo = true;
  }

  closeGrafico(){
    this.graficos = false;
  }

  closeGraficoComparativo(){
    this.comparativo = false;
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

    this.definirGraficosComparativos(this.ultimos);
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

  navegarARecomendacion(itemId: number, idP: number): void {
    this.router.navigate(['/recomendation', itemId, idP]);
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

  formatearFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
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

    this.chartOptionsPye1 = {
      animationEnabled: true,
      colorSet: ["rgb(220 38 38)","rgb(252 211 77)","rgb(74 222 128)"],
      title: {
        text: "Observaciones / Nivel de riesgo"
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
    this.chartOptionsBar1 = {
      title: {
        text: "Observaciones / Nivel de riesgo"
      },
      colorSet: ["rgb(220 38 38)","rgb(252 211 77)","rgb(74 222 128)"],
      animationEnabled: true,
      data: [{        
        type: "column",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { label: "Altas (" + this.altas + "/" + this.recomendations.length + ")", y: this.altas * 100 / this.recomendations.length, name: "Alta (" + this.altas + "/" + this.recomendations.length + ")" },
          { label: "Medias (" + this.medias + "/" + this.recomendations.length + ")", y: this.medias * 100 / this.recomendations.length, name: "Media (" + this.medias + "/" + this.recomendations.length + ")" },
          { label: "Bajas (" + this.bajas + "/" + this.recomendations.length + ")", y: this.bajas * 100 / this.recomendations.length, name: "Baja (" + this.bajas + "/" + this.recomendations.length + ")" },
        ]
      }]
    }

    this.chartOptionsPye2 = {
      animationEnabled: true,
      colorSet: ["rgb(74 222 128)","rgb(220 38 38)"],
      title: {
      text: "Observaciones / Asignación de responsables"
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
    this.chartOptionsBar2 = {
      title: {
        text: "Observaciones / Asignación de responsables"
      },
      colorSet: ["rgb(74 222 128)","rgb(220 38 38)"],
      animationEnabled: true,
      data: [{        
        type: "column",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { label: "Asignadas (" + this.asignadas + "/" +  this.recomendations.length + ")", y: this.asignadas*100/this.recomendations.length, name: "Asignadas (" + this.asignadas + "/" +  this.recomendations.length + ")" },
          { label: "Sin asignar (" + this.sinAsignar + "/" +  this.recomendations.length + ")", y: this.sinAsignar*100/this.recomendations.length, name: "Sin asignar (" + this.sinAsignar + "/" +  this.recomendations.length + ")" },
        ]
      }]
    }

    this.chartOptionsPye3 = {
      animationEnabled: true,
      colorSet: ["rgb(74 222 128)","rgb(220 38 38)"],
      title: {
      text: "Observaciones / Asignación de fechas"
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
    this.chartOptionsBar3 = {
      title: {
        text: "Observaciones / Asignación de fechas"
      },
      colorSet: ["rgb(74 222 128)","rgb(220 38 38)"],
      animationEnabled: true,
      data: [{        
        type: "column",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { label: "Con fecha final (" + this.fechas + "/" +  this.recomendations.length + ")", y: this.fechas*100/this.recomendations.length, name: "Con fecha final (" + this.fechas + "/" +  this.recomendations.length + ")"},
          { label: "Sin fecha final (" + this.sinFechas + "/" +  this.recomendations.length + ")", y: this.sinFechas*100/this.recomendations.length, name: "Sin fecha final (" + this.sinFechas + "/" +  this.recomendations.length + ")"},
        ]
      }]
    }

    this.chartOptionsPye4 = {
      animationEnabled: true,
      title: {
      text: "Observaciones / Vencimiento"
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
    this.chartOptionsBar4 = {
      title: {
        text: "Observaciones / Vencimiento"
      },
      colorSet: ["rgb(220 38 38)","rgb(252 211 77)","rgb(74 222 128)"],
      animationEnabled: true,
      data: [{        
        type: "column",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { label: "En proceso (" + this.contadorOk + "/" +  this.fechas + ")", y: this.contadorOk*100/this.fechas,name: "En proceso (" + this.contadorOk + "/" +  this.fechas + ")"},
          { label: "Vencidos (" + this.contadorVencido + "/" +  this.fechas + ")", y: this.contadorVencido*100/this.fechas, name: "Vencidos (" + this.contadorVencido + "/" +  this.fechas + ")"},
          { label: "Por expirar (" + this.contadorPorExpirar + "/" +  this.fechas + ")", y: this.contadorPorExpirar*100/this.fechas, name: "Por expirar (" + this.contadorPorExpirar + "/" +  this.fechas + ")"},
        ]
      }]
    }
  }

  definirGraficosComparativos(months: number) {
    const fechas: string[] = [];
    const fechaActual: Date = new Date();
    fechas.push(this.formatearFecha(fechaActual));
  
    for (let i = 1; i < months; i++) {
      const fechaAnterior = new Date();
      fechaAnterior.setMonth(fechaActual.getMonth() - i);
      fechas.push(this.formatearFecha(fechaAnterior));
    }
    fechas.reverse();

    const respuestas: any[] = [];
    let llenos = 0;
    fechas.forEach((fecha, index) => {
      this.recomendationService.getRecomendationesToDate(fecha, this.id).subscribe({
        next: (data) => {
          respuestas[index] = data;
          llenos = llenos + 1;
          if(llenos == fechas.length){
            this.completarDataGraficosComparativos(fechas, respuestas);
          }
        },
        error: (e) => {
          console.error(`Error para la fecha ${fecha}: ${e}`);
        }
      });
    });
  }

  completarDataGraficosComparativos(fechas: string[], respuestas: any[]){
    let altas = 0;
    let medias = 0;
    let bajas = 0;

    let dataPointsAltas = [];
    let dataPointsMedias = [];
    let dataPointsBajas = [];

    for(let i = 0; i < respuestas.length; i++){
      let recoms: Recomendation[] = respuestas[i];
      altas = 0;
      medias = 0;
      bajas = 0;
      for(const recomendacion of recoms) {
        switch(recomendacion.nivelRiesgo) {
          case 1: bajas++; break;
          case 2: medias++; break;
          case 3: altas++; break;
        }
      }
      let dataPointAlta = {label: fechas[i].substring(8,10) + "-" + fechas[i].substring(5,7) + "-" + fechas[i].substring(0,4), y: altas};
      let dataPointMedia = {label: fechas[i].substring(8,10) + "-" + fechas[i].substring(5,7) + "-" + fechas[i].substring(0,4), y: medias};
      let dataPointBaja = {label: fechas[i].substring(8,10) + "-" + fechas[i].substring(5,7) + "-" + fechas[i].substring(0,4), y: bajas};

      dataPointsAltas.push(dataPointAlta);
      dataPointsMedias.push(dataPointMedia);
      dataPointsBajas.push(dataPointBaja);
    }

    this.chartOptions = {
      animationEnabled: true,
      colorSet: "colorRiesgos",
      title: {
        text: "Observaciones Vs Nivel de riesgo"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: function (e: any) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "column",
        name: "Altas",
        legendText: "Riesgo Alto",
        showInLegend: true,
        dataPoints: dataPointsAltas
      },
      {
        type: "column",
        name: "Medias",
        legendText: "Riesgo Medio",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPointsMedias
      },
      {
        type: "column",
        name: "Bajas",
        legendText: "Riesgo Bajo",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPointsBajas
      }
      ]
    }
  }

  changeValueUltimos() {
    this.definirGraficosComparativos(this.ultimos);
  }

  cambiarGrafico(item: number) {
    this.graficoSeleccionado = item;
  }

  cambiarTipoGrafico(item: number) {
    this.tipoGrafico = item;
  }

}