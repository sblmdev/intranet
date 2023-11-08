import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  faChevronDown = faChevronDown;

  constructor(private router: Router) {
  }

  goToNewsDetail(){
    this.router.navigate(['/', 'news-detail'])
  }
}
