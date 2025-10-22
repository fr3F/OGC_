import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageSoldeComponent } from './page/form-page-solde/form-page-solde.component';
import { ListePageSoldeComponent } from './page/liste-page-solde/liste-page-solde.component';

const routes: Routes = [
  { path: '', component: ListePageSoldeComponent },
  { path: 'ajouter', component: FormPageSoldeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoldeRoutingModule { }
