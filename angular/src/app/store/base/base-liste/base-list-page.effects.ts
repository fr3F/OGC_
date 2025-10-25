import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, finalize, Observable } from 'rxjs';
import { BaseService } from 'src/app/core/base/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { loadList, loadListFailure, loadListSuccess } from '../base-liste/base-list-page.actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CollaborateurService } from 'src/app/features/rh/collaborateurs/service/collaborateur.service';
import { DepartementService } from 'src/app/features/rh/departement/services/departement.service';
import { ManagersService } from 'src/app/features/rh/managers/services/managers.service';
import { ComptesService } from 'src/app/features/rh/compte/services/compte.service';
import { StatutCongeService } from 'src/app/features/conges/statut-conges/services/statut_conge.service';
import { TypeCongeService } from 'src/app/features/conges/type-conges/services/type_conge.service';
import { DemandeCongesService } from 'src/app/features/conges/demande-conges/services/demande-conges.service';
import { SoldeService } from 'src/app/features/conges/solde/services/solde.service';


@Injectable()
export class BaseListPageEffects {

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadList),
      tap(() => this.spinner.show()),
      mergeMap(({ nomModele, params, status }) =>
        this.getService(nomModele, params, status).pipe(
          tap((response) => console.log(`Réponse API ${nomModele}`, response)),
          map((response: any) => this.normalizeResponse(nomModele, response)),
          catchError((error) => {
            this.notif.error(error);
            return of(loadListFailure({ nomModele, error }));
          }),
          finalize(() => this.spinner.hide())
        )
      )
    )
  );
  
  private normalizeResponse(nomModele: string, response: any) {
  let data: any[] = [];
  let totalItems = 0;

  if (Array.isArray(response)) {
    // cas classique array brut
    data = response;
    totalItems = response.length;
  } else {
    // cas objet avec champs spécifiques
    if (nomModele === 'users' && response.users) {
      data = response.users;
      totalItems = response.totalItems || data.length;
    } else {
      data = response.data || [];
      totalItems = response.totalItems || data.length;
    }
  }

  return loadListSuccess({ nomModele, data, totalItems });
}

  private getService(nomModele: string, params: any, status) {
    switch (nomModele) {

      case 'collaborateur':
        return this.collaborateurService.getAllDetailCollab(nomModele, params);

      case 'departement':
        return this.departementService.getAllDetailDepart(nomModele, params);

      case 'manager':
        return this.managersService.getAllDetailManager(nomModele, params);

      case 'compte':
        return this.comptesService.getAllDetailcompte(nomModele, params);

      case 'statusconge':
        return this.statutCongesService.getAllDetailStatutConges(nomModele, params);

      case 'typeconge':
        return this.typeCongeService.getAllDetailTypeConge(nomModele, params);

      case 'demandeconge':
        return status === 'manager'
          ? this.demandeCongeService.getAllDemandeCongeManagerByLogin(nomModele, params)
          : this.demandeCongeService.getAllDemandeCongeByLogin(nomModele, params);
      case 'solde':
        return this.soldeService.getAllDetailSoldes(nomModele, params);

      default:
        return this.baseService.list(nomModele, params);
    }
  }


  constructor(
    private actions$: Actions,
    private collaborateurService: CollaborateurService,
    private departementService: DepartementService,
    private managersService: ManagersService,
    private comptesService: ComptesService,
    private baseService: BaseService,
    private spinner: NgxSpinnerService,
    private notif : NotificationService,
    private statutCongesService: StatutCongeService,
    private typeCongeService: TypeCongeService,
    private demandeCongeService: DemandeCongesService,
    private soldeService: SoldeService
  ) {}
}
