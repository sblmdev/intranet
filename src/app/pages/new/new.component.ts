import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publicationService';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  id: number;
  publication: Publication = new Publication();

  constructor(private route: ActivatedRoute, private router: Router, private publicationService: PublicationService) {
   this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');

    this.publicationService.getPublicationById(this.id).subscribe({
      next: (data) => {
        this.publication = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

}
