import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recomendation } from 'src/app/models/recomendation';
import { RecomendationService } from 'src/app/services/recomendation.service';

@Component({
  selector: 'app-recomendation-form',
  templateUrl: './recomendation-form.component.html',
  styleUrls: ['./recomendation-form.component.css']
})
export class RecomendationFormComponent {
  id: number;
  recomendacion: Recomendation = new Recomendation();

  constructor(private route: ActivatedRoute, 
    private recomendationService: RecomendationService,
    private toastr: ToastrService) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.clearData();
  }

  clearData() {
    this.recomendacion = new Recomendation();
    if(this.id != 0){
      this.recomendationService.getRecomendationById(this.id).subscribe({
        next: (data) => {
          this.recomendacion = data;
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
    
  }

}
