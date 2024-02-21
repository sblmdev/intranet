import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsComponent } from './pages/news/news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssistsComponent } from './pages/assists/assists.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { HeaderComponent } from './pages/all-components/header/header.component';
import { NavbarComponent } from './pages/all-components/navbar/navbar.component';
import { FooterComponent } from './pages/all-components/footer/footer.component';
import { SidebarComponent } from './pages/all-components/sidebar/sidebar.component';
import { GraveyardsComponent } from './pages/graveyards/graveyards/graveyards.component';
import { ReservationsComponent } from './pages/graveyards/reservations/reservations.component';
import { BurialsComponent } from './pages/graveyards/burials/burials.component';
import { TreasuryComponent } from './pages/graveyards/treasury/treasury.component';
import { TransfersComponent } from './pages/graveyards/transfers/transfers.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PhonebookComponent } from './pages/phonebook/phonebook.component';
import { DirectorateMembersComponent } from './pages/directorate-members/directorate-members.component';
import { CommonModule } from '@angular/common';
import { NewComponent } from './pages/new/new.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecomendationsComponent } from './pages/recomendations/recomendations.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { ControlComponent } from './pages/control/control.component';
import { RecomendationFormComponent } from './pages/recomendation-form/recomendation-form.component';
import { InfoPlansComponent } from './pages/info-plans/info-plans.component';
import { RrhhComponent } from './pages/rrhh/rrhh.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    AssistsComponent,
    EvaluationsComponent,
    QuestionnaireComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    GraveyardsComponent,
    ReservationsComponent,
    BurialsComponent,
    TreasuryComponent,
    TransfersComponent,
    PublicationComponent,
    DocumentsComponent,
    PlansComponent,
    PhonebookComponent,
    DirectorateMembersComponent,
    NewComponent,
    RecomendationsComponent,
    ControlComponent,
    RecomendationFormComponent,
    InfoPlansComponent,
    RrhhComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule ,
    NgxPaginationModule,
    CanvasJSAngularChartsModule,
    GalleryComponent, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
