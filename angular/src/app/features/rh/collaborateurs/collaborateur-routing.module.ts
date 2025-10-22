import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageCollaborateursComponent } from './page/form-page-collaborateurs/form-page-collaborateurs.component';
import { ListePageCollaborateursComponent } from './page/liste-page-collaborateurs/liste-page-collaborateurs.component';

const routes: Routes = [
  { path: '', component: ListePageCollaborateursComponent },
  { path: 'ajouter', component: FormPageCollaborateursComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class collaborateurRoutingModule { }
