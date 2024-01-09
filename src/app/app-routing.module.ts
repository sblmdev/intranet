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

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'plans', component: PlansComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
