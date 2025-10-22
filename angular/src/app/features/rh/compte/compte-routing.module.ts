import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListePageComptesComponent } from './page/liste-page-departements/liste-page-departements.component';
import { FormPageComptesComponent } from './page/form-page-compte/form-page-compte.component';

const routes: Routes = [
  { path: '', component: ListePageComptesComponent },
  { path: 'ajouter', component: FormPageComptesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRoutingModule { }
