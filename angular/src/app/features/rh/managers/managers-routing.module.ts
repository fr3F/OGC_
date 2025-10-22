import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageManagersComponent } from './page/form-page-managers/form-page-managers.component';
import { ListePageManagersComponent } from './page/liste-page-managers/liste-page-managers.component';

const routes: Routes = [
  { path: '', component: ListePageManagersComponent },
  { path: 'ajouter', component: FormPageManagersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
