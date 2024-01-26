import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publications';
import { PublicationService } from 'src/app/services/publication.service';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  id: number;
  publication: Publication = new Publication();
  items: GalleryItem[] = [];

  constructor(private route: ActivatedRoute, private publicationService: PublicationService, private documentService: DocumentService) {
   this.id = 0;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');

    this.publicationService.getPublicationById(this.id).subscribe({
      next: (data) => {
        this.publication = data;
        if(this.publication.tipoPublicacion == 'Galería'){
          this.documentService.getDocumentsByIdPublication(this.publication.id).subscribe({
            next: (data2) => {
              this.items = [];
              let documents = data2;
              for(let i=0; i<documents.length; i++) {
                let image = {
                  src: documents[i].urlDocumento.toString(),
                  thumbSrc: documents[i].urlDocumento.toString(),
                }
                this.items.push(image);
              }
            },
            error: (_error2) => {
              console.log(_error2);
            }
          })
        }
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

}
