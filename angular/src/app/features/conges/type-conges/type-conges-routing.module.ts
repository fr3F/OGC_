import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListePageTypeCongesComponent } from './page/liste-page-type-conges/liste-page-type-conges.component';
import { FormPageTypeCongesComponent } from './page/form-page-type-conges/form-page-type-conges.component';

const routes: Routes = [
  { path: '', component: ListePageTypeCongesComponent },
  { path: 'ajouter', component: FormPageTypeCongesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeCongesRoutingModule { }
