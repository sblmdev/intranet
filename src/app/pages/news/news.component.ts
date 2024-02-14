import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publication.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  faChevronDown = faChevronDown;
  publications: Publication[] = [];
  publication: Publication = new Publication();
  p:any = 0;
  constructor(private router: Router, private publicationService: PublicationService) {

  }

  ngOnInit() {
    this.publicationService.obtenerPublicacionesPorTipo("Comunicaciones").subscribe({
      next: (data) => {
        this.publications = data;
        this.publications = this.publications.sort((a,b) => b.id - a.id);
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

  goToNewsDetail(id: number) {
    this.router.navigate([`/new/${id}`]);
  }
  
}
