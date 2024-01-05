import { Component } from '@angular/core';
import { Assist } from 'src/app/models/assistant';
import { AssistsService } from 'src/app/services/assists.service';

@Component({
  selector: 'app-assists',
  templateUrl: './assists.component.html',
  styleUrls: ['./assists.component.css']
})
export class AssistsComponent {

  assistans: Assist[] = [];

  constructor(private assistantService: AssistsService) {
  }

  ngOnInit() {
    this.searchAssistants();
  }

  searchAssistants() {
    this.assistantService.searchAsistant("45608935", "12", "2023").subscribe({
      next: (data) => {
        console.log("DATA", data);
        this.assistans = data;
      },
      error: (_error) => {
        console.log(_error);
      }
    });
  }

  // calculateTotal(property: string): number {
  //   return this.assistans.reduce((total, assistant) => total + assistant[property], 0);
  // }


}