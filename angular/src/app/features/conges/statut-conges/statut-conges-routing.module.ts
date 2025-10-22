import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageStatutCongesComponent } from './page/form-page-statut-conges/form-page-statut-conges.component';
import { ListePageStatutCongesComponent } from './page/liste-page-statut-conges/liste-page-statut-conges.component';

const routes: Routes = [
  { path: '', component: ListePageStatutCongesComponent },
  { path: 'ajouter', component: FormPageStatutCongesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatutCongesRoutingModule { }
