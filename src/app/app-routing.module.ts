import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PrimenumberComponent } from './primenumber/primenumber.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'primenumber', component: PrimenumberComponent},
  {path: 'student-registration', component: StudentRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
