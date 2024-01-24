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
  recomendation: Recomendation = new Recomendation();

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
    this.recomendation = new Recomendation();
    if (this.id != 0) {
      this.recomendationService.getRecomendationById(this.id).subscribe({
        next: (data) => {
          this.recomendation = data;
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

  submitForm(): void {
    // Aquí puedes manejar la lógica cuando se envía el formulario
    console.log('Formulario enviado:', this.recomendation);
  }

}
