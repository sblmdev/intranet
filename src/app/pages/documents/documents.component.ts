import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publicationService';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  id: string;
  publications: Publication[] = [];
  publication: Publication =  new Publication();

  constructor(private route: ActivatedRoute, private router: Router, private publicationService: PublicationService) {
    this.id = '';
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      console.log('ID actualizado:', this.id);
      this.publicationService.obtenerPublicacionesPorTipo(this.id).subscribe({
        next: (data) => {
          this.publications = data;
        },
        error: (_error) => {
          console.log(_error);
        }
      });
    });
  }

  
}
