import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListePageDemandeCongeComponent } from './page/liste-page-demande-conge/liste-page-demande-conge.component';
import { FormPageDemandeCongesComponent } from './page/form-page-demande-conge/form-page-demande-conge.component';

const routes: Routes = [
  { path: '', component: ListePageDemandeCongeComponent },
  { path: 'ajouter', component: FormPageDemandeCongesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeCongeRoutingModule { }
