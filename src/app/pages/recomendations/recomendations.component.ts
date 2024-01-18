import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recomendation } from 'src/app/models/recomendation';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css']
})
export class RecomendationsComponent {
  id: number;
  recomendations: Recomendation[] = [];
  nuevoFlag: boolean=false;
  recomendation: Recomendation = new Recomendation();
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

  constructor(private route: ActivatedRoute, 
    private router: Router, 
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

    this.recomendationService.getRecomendationesByIdPlan(this.id).subscribe({
      next: (data) => {
        this.recomendations = data;
        for (const recomendacion of this.recomendations) {
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

        this.chartOptions = {
          animationEnabled: true,
          title: {
          text: "Niveles de riesgo - " + this.recomendations.length + " Recomendaciones"
          },
          data: [{
          type: "pie",
          startAngle: -90,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###.##'%'",
          dataPoints: [
            { y: this.altas*100/this.recomendations.length, name: "Alta (" + this.altas + "/" +  this.recomendations.length + ")"},
            { y: this.medias*100/this.recomendations.length, name: "Media (" + this.medias + "/" +  this.recomendations.length + ")"},
            { y: this.bajas*100/this.recomendations.length, name: "Baja (" + this.bajas + "/" +  this.recomendations.length + ")"},
          ]
          }]
        }

        this.chartOptions2 = {
          animationEnabled: true,
          title: {
          text: "Recomendaciones asignadas - " + this.recomendations.length + " Recomendaciones"
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
          title: {
          text: "Recomendaciones con fechas - " + this.recomendations.length + " Recomendaciones"
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
      },
      error: (_error) => {
        console.log(_error);
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

}
