import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  recomendation: Recomendation = new Recomendation();
  recomendationOld: Recomendation = new Recomendation();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private recomendationService: RecomendationService,
    private toastr: ToastrService) {
    this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    this.clearData();
  }

  clearData() {
    this.recomendation = new Recomendation();
    if (this.id != 0) {
      this.recomendationService.getRecomendationById(this.id).subscribe({
        next: (data) => {
          this.recomendation = JSON.parse(JSON.stringify(data));
          this.recomendationOld = JSON.parse(JSON.stringify(data));
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

  guardar() {
    if(this.id == 0){

    }
    else{
      this.recomendationOld.estado = false;
      this.recomendationService.updateRecomendation(this.recomendationOld).subscribe({
        next: (data1) => {
          let fechaHoy = new Date();
          let año = fechaHoy.getFullYear();
          let mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
          let dia = fechaHoy.getDate().toString().padStart(2, '0');
          let fechaHoyString = `${año}-${mes}-${dia}`;
          this.recomendation.fechaModificacion = fechaHoyString;
          this.recomendation.id = 0;
          console.log(this.recomendation);
          this.recomendationService.addRecomendation(this.recomendation).subscribe({
            next: (data2) => {
              this.router.navigate(['/recomendations', data2.idPlan]);
            }
          });
        },
        error: (e1) => {
          console.log(e1);
        }
      });
    }
  }

}
