import { Component } from '@angular/core';
import * as moment from 'moment';
import { AssistTime } from 'src/app/models/assistantTime';
import { AssistsService } from 'src/app/services/assists.service';

@Component({
  selector: 'app-assists',
  templateUrl: './assists.component.html',
  styleUrls: ['./assists.component.css']
})
export class AssistsComponent {
  dni: string = "";

  months = [
    { label: 'Enero', value: '1' },
    { label: 'Febrero', value: '2' },
    { label: 'Marzo', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Mayo', value: '5' },
    { label: 'Junio', value: '6' },
    { label: 'Julio', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setiembre', value: '9' },
    { label: 'Octubre', value: '10' },
    { label: 'Noviembre', value: '11' },
    { label: 'Diciembre', value: '12' },
  ];

  years = [
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
  ];

  assistans: AssistTime[] = [];
  selectedMonth: string = '01';
  selectedYear: string = '2024';

  selectedMonthNumber: number = 0o1;
  selectedYearNumber: number = 2024;

  constructor(private assistantService: AssistsService) { }

  ngOnInit() {
    const usuarioString = sessionStorage.getItem("Usuario");
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.dni = usuario.dni;
    }
  }

  searchAssistants() {
    this.assistantService.searchAsistant(this.dni, this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => {
        this.assistans = data.map((assistant: any) => {
          const fecha = new Date(assistant.fecha);
          assistant.day = this.obtenerNombreDia(fecha.getDay());
          return assistant;
        });
        this.updateHeader();
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }
  calculateIndividualLateMinutes(assistant: any): number {
    const entradaPlaneada = moment('08:20', 'HH:mm');
    const llegadaReal = moment(assistant.dhoraingre_entrada.timestamp.slice(11, 16), 'HH:mm');
    const tardanzaLlegada = llegadaReal.diff(entradaPlaneada, 'minutes');
    return tardanzaLlegada > 0 ? tardanzaLlegada : 0;
  }

  calculateTotalLateMinutes(): number {
    let totalLateMinutes = 0;
    this.assistans.forEach(assistant => {
      const entradaPlaneada = moment('08:20', 'HH:mm');
      const llegadaReal = moment(assistant.dhoraingre_entrada.timestamp.slice(11, 16), 'HH:mm');
      const tardanzaLlegada = llegadaReal.diff(entradaPlaneada, 'minutes');

      if (tardanzaLlegada > 0) {
        totalLateMinutes += tardanzaLlegada;
      }
    });
    return totalLateMinutes;
  }

  formatTimestamp(timestamp: string): string {
    return (
      timestamp.slice(8, 10) +
      '-' +
      timestamp.slice(5, 7) +
      '-' +
      timestamp.slice(0, 4) +
      ' ' +
      timestamp.slice(11, 16)
    );
  }

  updateHeader() {
    this.selectedMonthNumber = parseInt(this.selectedMonth, 10);
    this.selectedYearNumber = parseInt(this.selectedYear, 10);
  }

  obtenerNombreDia(numeroDia: number): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return diasSemana[numeroDia];
  }

}