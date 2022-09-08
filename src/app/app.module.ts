import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { GoalsViewComponent } from './components/goals-view/goals-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddGoalComponent,
    GoalsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    FormsModule, ReactiveFormsModule,
    MessageModule, MessagesModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
