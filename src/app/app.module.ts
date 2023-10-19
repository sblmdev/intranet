import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssistsComponent } from './assists/assists.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    AssistsComponent
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
