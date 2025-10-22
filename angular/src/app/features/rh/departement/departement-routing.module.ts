import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListePageDepartementsComponent } from './page/liste-page-departements/liste-page-departements.component';
import { FormPageDepartementsComponent } from './page/form-page-departements/form-page-departements.component';

const routes: Routes = [
  { path: '', component: ListePageDepartementsComponent },
  { path: 'ajouter', component: FormPageDepartementsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
