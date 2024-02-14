import { Component } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Plan } from 'src/app/models/plan';
import { Recomendation } from 'src/app/models/recomendation';
import { PlanService } from 'src/app/services/plan.service';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-info-plans',
  templateUrl: './info-plans.component.html',
  styleUrls: ['./info-plans.component.css']
})
export class InfoPlansComponent {
  plan: Plan = new Plan();
  plans: Plan[] = [];
  recomendations: Recomendation[] = [];

  p:any

  recomendacionesFlag: boolean = false;

  constructor(private planService: PlanService, private recomendationService: RecomendationService) {

  }

  ngOnInit() {
    this.planService.getPlanes().subscribe({
      next: (data) => {
        this.plans = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  openRecomendations(idPlan: number) {
    this.recomendacionesFlag = true;
    let p = this.plans.find(p => p.id == idPlan);
    if(p != undefined){
      this.plan = JSON.parse(JSON.stringify(p));
    }
    this.recomendationService.getRecomendationesByIdPlan(idPlan).subscribe({
      next: (data) => {
        this.recomendations = data;
      },
      error: (_e) => {
        console.log(_e);
      }
    });
  }

  closeRecomendations() {
    this.recomendacionesFlag = false;
  }
}
