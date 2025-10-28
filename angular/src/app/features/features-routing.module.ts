import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'user', loadChildren: () => import('../features/users/user.module').then(m => m.UserModule) },
  { path: 'collaborateur', loadChildren: () => import('./rh/collaborateurs/collaborateur-routing.module').then(m => m.collaborateurRoutingModule) },
  { path: 'manager', loadChildren: () => import('./rh/managers/managers-routing.module').then(m => m.ManagerRoutingModule) },
  { path: 'departement', loadChildren: () => import('./rh/departement/departement-routing.module').then(m => m.DepartementRoutingModule) },
  { path: 'compte', loadChildren: () => import('./rh/compte/compte-routing.module').then(m => m.CompteRoutingModule) },
  { path: 'statut-conges', loadChildren: () => import('./conges/statut-conges/statut-conges-routing.module').then(m => m.StatutCongesRoutingModule) },
  { path: 'type-conges', loadChildren: () => import('./conges/type-conges/type-conges-routing.module').then(m => m.TypeCongesRoutingModule) },
  { path: 'demande-conge', loadChildren: () => import('./conges/demande-conges/demande-conges-routing.module').then(m => m.DemandeCongeRoutingModule) },
  { path: 'solde', loadChildren: () => import('./conges/solde/solde-routing.module').then(m => m.SoldeRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
