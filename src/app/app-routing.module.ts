import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { InstructionsComponent } from './components/instructions/instructions.component';

const routes: Routes = [
  {
    path: '', component: CalendarComponent, pathMatch: 'full'
  },
  {
    path: 'instructions', component: InstructionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
