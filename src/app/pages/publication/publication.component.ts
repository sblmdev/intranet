import { Component } from '@angular/core';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/PublicationService';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {

  publications: Publication[];

  constructor(private publicationService: PublicationService) {
    this.publications = [];
  }

  ngOnInit() {
    this.publicationService.getPublications().subscribe({
      next: (data) => {
        this.publications = data;
        console.log(this.publications);
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }
}
