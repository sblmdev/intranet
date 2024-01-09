import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publicationService';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  faChevronDown = faChevronDown;
  publications: Publication[] = [];
  publication: Publication = new Publication();

  constructor(private router: Router, private publicationService: PublicationService) {

  }

  ngOnInit() {
    this.publicationService.obtenerPublicacionesPorTipo("Comunicaciones").subscribe({
      next: (data) => {
        this.publications = data;
        this.publication = this.publications[0];
        if(this.publication == undefined){
          this.publication = new Publication();
        }
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  goToNewsDetail(){
    this.router.navigate(['/', 'news-detail'])
  }
}
