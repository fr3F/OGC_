import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs';
import { of } from 'rxjs';
import { BaseService } from 'src/app/core/base/base/base.service';
import { AutoriseZeroService } from 'src/app/features/parametrage/autorize-zero-page/service/autorise-zero.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemandeVirementService } from 'src/app/features/suivi-commande-depot/demande/service/demande-virement.service';
import { CaisseService } from 'src/app/features/caisses/services/caisse.service';
import { baseUpdate, baseUpdateFailure, baseUpdateSuccess } from './base-update.actions';
import { MenuService } from 'src/app/core/services/menu.service';

@Injectable()
export class BaseUpdateEffects {
  constructor(
    private actions$: Actions,
    private baseService: BaseService,
    private menuServ: MenuService,
    private autoriseZeroService: AutoriseZeroService,
    private notif: NotificationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseUpdate),
      mergeMap(({ nomModele, data, redirectUrl }) => {
        this.spinner.show();

        return this.updateServices(nomModele, data).pipe(
          map((response) => baseUpdateSuccess({ nomModele, response })),
          tap(() =>{
            setTimeout(() => window.location.reload(), 1000)
            return this.notif.show("Mis à jour avec succès")
          }),
          tap(() => this.spinner.hide()),
          tap(() => this.autoriseZeroService.triggerReloadChildData()),
          tap(() => this.modalService.dismissAll()),
          tap(() => {
            if (redirectUrl) {
              this.router.navigateByUrl(redirectUrl);
            }
          }),
          catchError((error) => {
            this.spinner.hide();
            this.notif.error(error);
            return of(baseUpdateFailure({ nomModele, error }));
          })
        );
      })
    )
  );

  private updateServices(nomModele: string, data: any) {
    switch (nomModele) {
      case 'fonctionnalites':
        return this.menuServ.updateAcces(data.roleId, data.menus, data.modules);


      default:
        return this.baseService.update(data, nomModele);
    }
  }
}
