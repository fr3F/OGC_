import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, tap } from "rxjs";
import { of } from "rxjs";import {
  baseSave,
  baseSaveFailure,
  baseSaveSuccess,
} from "./base-create-page.actions";
import { NotificationService } from "src/app/core/services/notification.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AutoriseZeroService } from "src/app/core/services/autorise-zero.service";
import { BaseService } from "src/app/core/base/base/base.service";

@Injectable()
export class BaseCreateEffects {
  constructor(
    private actions$: Actions,
    private baseService: BaseService,
    private autoriseZeroService: AutoriseZeroService,
    private notif: NotificationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseSave),
      mergeMap(({ nomModele, data, redirectUrl }) => {
        this.spinner.show();

        return this.saveServices(nomModele, data).pipe(
          // ✅ utilisation dynamique
          map((response) => baseSaveSuccess({ nomModele, response })),
          tap(() => this.notif.show("Enregistré")),
          tap(() => this.spinner.hide()),
          tap(() => this.autoriseZeroService.triggerReloadChildData()),
          tap(() => {
            this.modalService.dismissAll(); // ferme le modal après succès
          }),
          tap(() => {
            if (redirectUrl) {
              this.router.navigateByUrl(redirectUrl);
            }
          }),
          catchError((error) => {
            this.spinner.hide();
            this.notif.error(error);
            return of(baseSaveFailure({ nomModele, error }));
          })
        );
      })
    )
  );

  private saveServices(nomModele: string, data: any) {
    switch (nomModele) {
      case "collaborateur":
        return this.baseService.save(data, nomModele);

      default:
        return this.baseService.save(data, nomModele); 
    }
  }
}
