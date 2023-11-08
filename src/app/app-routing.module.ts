import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewsComponent } from './pages/news/news.component';
import { AssistsComponent } from './pages/assists/assists.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-detail', component: NewsDetailComponent },
  { path: 'assists', component: AssistsComponent },
  { path: 'evaluations', component: EvaluationsComponent },
  { path: 'questionnaire', component: QuestionnaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
