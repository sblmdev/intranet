import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { AssistsComponent } from './assists/assists.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'news', component: NewsComponent },
  { path: 'assists', component: AssistsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
