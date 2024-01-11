import { Component } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  nuevoFlag: boolean=false;
  plan: Plan = new Plan();
  plans: Plan[] = [];

  constructor(private planService: PlanService) {
  
  }

  ngOnInit() {
    this.clearData();
  }

  toggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    return this.nuevoFlag
  }

  closetoggleNuevo(): boolean{
    this.nuevoFlag=!this.nuevoFlag
    return this.nuevoFlag
  }

  savePublication(){
    this.planService.addPlan(this.plan).subscribe({
      next: (data2) => {
        this.clearData();
      },
      error: (error2) => {
        console.log(error2);
      }
    });
  }

  clearData(){
    this.plan = new Plan();
    this.nuevoFlag = false;
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

}
