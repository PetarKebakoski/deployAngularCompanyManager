import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysComponent } from './holidays/holidays.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TimeCardComponent } from './time-card/time-card.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'time-card', component: TimeCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
