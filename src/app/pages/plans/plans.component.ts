import { Component } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  nuevoFlag: boolean=false;
  plan: Plan = new Plan();
  plans: Plan[] = [];
  p:any;

  opciones: string[] = [
    "TIPO DE AUDITORIA 1",
    "TIPO DE AUDITORIA 2",
    "TIPO DE AUDITORIA 3",
    "TIPO DE AUDITORIA 4"
  ];

  constructor(private router: Router, 
    private planService: PlanService, 
    private toastr: ToastrService) {
  
  }

  ngOnInit() {
    this.clearData();
  }

  toggleNuevo() {
    this.nuevoFlag=true;
    this.plan = new Plan();
    this.plan.entidad = "SOCIEDAD DE BENEFICENCIA DE LIMA METROPOLITANA";
  }

  closetoggleNuevo() {
    this.clearData();
  }

  savePublication(){
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

  clearData(){
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
