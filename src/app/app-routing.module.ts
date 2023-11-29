import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { AssistsComponent } from './pages/assists/assists.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { NewsRegisterComponent } from './pages/news-register/news-register.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-detail', component: NewsDetailComponent },
  { path: 'news-register', component: NewsRegisterComponent },
  { path: 'assists', component: AssistsComponent },
  { path: 'evaluations', component: EvaluationsComponent },
  { path: 'questionnaire', component: QuestionnaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
