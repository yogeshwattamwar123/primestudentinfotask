import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimenumberComponent } from './primenumber/primenumber.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { LandingComponent } from './landing/landing.component';
import { StudentsService } from './students.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PrimenumberComponent,
    StudentRegistrationComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [StudentsService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
