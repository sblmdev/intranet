import { Component } from '@angular/core';
import { Suggestion } from 'src/app/models/suggestion';
import { SuggestionService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent {
  p:any;
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {

  }

  ngOnInit() {
    this.suggestionService.obtenerTodosSugerencias().subscribe({
      next: (data) => {
        this.suggestions = data;
        this.suggestions.sort((a, b) => b.fecha.localeCompare(a.fecha));
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

}
