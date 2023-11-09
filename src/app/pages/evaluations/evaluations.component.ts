import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent {
  constructor(private router: Router) {
  }

  goToQuestionnaireResponse(){
    this.router.navigate(['/', 'questionnaire']);
  }
}
