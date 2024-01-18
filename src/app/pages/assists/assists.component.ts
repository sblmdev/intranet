import { Component } from '@angular/core';
import * as moment from 'moment';
import { AssistTime } from 'src/app/models/assistantTime';
import { Usuario } from 'src/app/models/usuario';
import { AssistsService } from 'src/app/services/assists.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-assists',
  templateUrl: './assists.component.html',
  styleUrls: ['./assists.component.css'],
  template: `
    <app-profile [dato]="dni" (evento)="manejarEvento($event)"></app-profile>
  `,
})
export class AssistsComponent {

  usuario: Usuario = new Usuario();
  perfilFlag:boolean=false;
  dni: string = "";
  dependencia: string = "";

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

  personal: Usuario[] = [];

  assistans: AssistTime[] = [];
  selectedMonth: string = '1';
  selectedYear: string = '2024';

  selectedMonthNumber: number = 1;
  selectedYearNumber: number = 2024;

  selectedPersonal: string = '';

  constructor(private assistantService: AssistsService,private toastr: ToastrService,private router: Router) { }
  ngOnInit() {
    const usuarioString = localStorage.getItem("Usuario");
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      this.dni = this.usuario.dni;
      this.dependencia = this.usuario.dependencia;
    }
    this.getPersonalByOficina();
  }
  errorConsulta() {
    this.toastr.error('Seleccione un usuario', 'Usuario no seleccionado');
  }
  
  getPersonalByOficina(){
    this.assistantService.getPersonalByDependencia(this.dependencia).subscribe({
      next: (data) => {
        this.personal = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  searchAssistants() {
    if(this.selectedPersonal.length == 0) {
      this.errorConsulta()
    } else {
      this.assistantService.searchAsistant(this.selectedPersonal, this.selectedMonth, this.selectedYear).subscribe({
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
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return diasSemana[numeroDia];
  }

  goToProfile(dni:string) {

    this.router.navigate(['/', 'profile']);
  }
  togglePerfil(dni:string): boolean {
    this.perfilFlag = !this.perfilFlag
    return this.perfilFlag
  }
}