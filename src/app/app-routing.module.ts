import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './pages/news/news.component';
import { AssistsComponent } from './pages/assists/assists.component';
import { EvaluationsComponent } from './pages/evaluations/evaluations.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
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
import { NewComponent } from './pages/new/new.component';
import { RecomendationsComponent } from './pages/recomendations/recomendations.component';
import { ControlComponent } from './pages/control/control.component';
import { RecomendationFormComponent } from './pages/recomendation-form/recomendation-form.component';
import { InfoPlansComponent } from './pages/info-plans/info-plans.component';
import { RrhhComponent } from './pages/rrhh/rrhh.component';
import { SuggestionsComponent } from './pages/suggestions/suggestions.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'new/:id', component: NewComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'recomendations/:id', component: RecomendationsComponent},
  { path: 'recomendation/:idRec/:idPlan', component: RecomendationFormComponent},
  { path: 'burials', component: BurialsComponent},
  { path: 'assists', component: AssistsComponent },
  { path: 'treasury', component: TreasuryComponent},
  { path: 'transfers', component: TransfersComponent},
  { path: 'phonebook', component: PhonebookComponent },
  { path: 'graveyards', component: GraveyardsComponent},
  { path: 'documents/:id', component: DocumentsComponent},
  { path: 'evaluations', component: EvaluationsComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'reservations', component: ReservationsComponent},
  { path: 'questionnaire', component: QuestionnaireComponent},
  { path: 'directorate', component: DirectorateMembersComponent},
  { path: 'control', component: ControlComponent},
  { path: 'infoPlans', component: InfoPlansComponent},
  { path: 'rrhh', component: RrhhComponent},
  { path: 'suggestions', component: SuggestionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
