import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { Publication } from 'src/app/models/publications';
import { Recomendation } from 'src/app/models/recomendation';
import { PlanService } from 'src/app/services/plan.service';
import { PublicationService } from 'src/app/services/publication.service';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  id: string;
  publications: Publication[] = [];
  publication: Publication = new Publication();
  p:any;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private publicationService: PublicationService,
    private planService: PlanService,
    private recomendationService: RecomendationService) {
    this.id = '';
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      this.publicationService.obtenerPublicacionesPorTipo(this.id).subscribe({
        next: (data) => {
          switch(this.id) {
            case 'Planes': this.id = 'Planes de Gestión'; break;
            case 'PlanesAccion': this.id = 'Planes de Acción'; break;
          }
          this.publications = data;
        },
        error: (_error) => {
          console.log(_error);
        }
      });
    });
  }

  goPlans(){
    this.router.navigate(['/infoPlans']);
  }
}
