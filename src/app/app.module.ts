import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsComponent } from './pages/news/news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssistsComponent } from './pages/assists/assists.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    AssistsComponent,
    EvaluationsComponent,
    QuestionnaireComponent,
    NewsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
