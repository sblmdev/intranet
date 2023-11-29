import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsComponent } from './pages/news/news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssistsComponent } from './pages/assists/assists.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { NewsRegisterComponent } from './pages/news-register/news-register.component';
import { HeaderComponent } from './pages/all-components/header/header.component';
import { NavbarComponent } from './pages/all-components/navbar/navbar.component';
import { FooterComponent } from './pages/all-components/footer/footer.component';
import { SidebarComponent } from './pages/all-components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    AssistsComponent,
    EvaluationsComponent,
    QuestionnaireComponent,
    NewsDetailComponent,
    NewsRegisterComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
