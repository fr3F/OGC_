import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponentComponent } from '../base-component/base-component.component';
import { BaseService } from '../base/base.service';

import { Actions, ofType } from '@ngrx/effects';
import { filter } from 'rxjs';
import { baseSave, baseSaveSuccess } from 'src/app/store/base/base-create/base-create-page.actions';
import { baseUpdate } from 'src/app/store/base/base-update/base-update.actions';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent extends BaseComponentComponent implements OnInit {

  @Input() data;
  @Input() parent: any;
  @Output() onValidate = new EventEmitter();

  genre: string = ""; // "" masculin, "e" feminin
  nom: string = "";
  url: string = "";
  loading: boolean = false;
  redirect: boolean = true;
  formGroup!: FormGroup;
  submit: boolean = false;
  nomModele:string = ""

  public actions$ = inject(Actions);
  public router = inject(Router);
  public baseServ =  inject(BaseService) ;
  public formBuilder = inject(FormBuilder);   

  listenSaveSuccess(nomModele) {
    this.actions$.pipe(
      ofType(baseSaveSuccess),
      filter(action => action.nomModele === nomModele)
    ).subscribe(() => {
      this.onValidate.emit(); 
    });
  }
    
  get form() {
    return this.formGroup?.controls ?? {};
  }

  valider(nomModele: string, data?: any, redirectUrl?: string, id?: number | string) {
    this.submit = true;
    this.nomModele = nomModele; 
    if (redirectUrl) this.url = redirectUrl;
    this.actionAvantValidation();

    if (this.formGroup && this.formGroup.invalid) {
      console.log("Formulaire invalide");
      return;
    }

    this.showSpinner();

    // sourceData = data passée ou valeur du formulaire ou this.data
    const sourceData = data ?? (this.formGroup ? this.formGroup.value : this.data);

    // flatten si formGroup présent
    const flattenedData = this.formGroup
      ? this.flattenFormData(sourceData)
      : (sourceData ? { ...sourceData } : {});

    // Si id passé en param ou this.data.id, on l’ajoute
    if (id) {
      flattenedData.id = id;
    } else if (this.data && this.data.id) {
      flattenedData.id = this.data.id;
    }

    const payload = { data: flattenedData, nomModele };
    this.storeAction(payload);
  }

  validerSimple(nomModele, data, redirectUrl?:string){
    if (redirectUrl) this.url = redirectUrl; 
    this.showSpinner();

    const payload = { data, nomModele };
    this.storeAction(payload, redirectUrl);
  }

  private flattenFormData(formValue: any): any {
    const result: any = {};
    Object.keys(formValue).forEach(key => {
      result[key.replace(/^data\./, '')] = formValue[key];
    });
    return result;
  }

  public storeAction(payload: { data: any; nomModele: string }, redirectUrl?:string) {
    console.log("data", payload.data.id);
    
    if (payload.data.id) {
      this.store.dispatch(baseUpdate({
        data:payload.data,
        nomModele:payload.nomModele,
        redirectUrl
      }));
      this.onSuccess()

    } else {
      this.store.dispatch(baseSave({ 
        nomModele: payload.nomModele, 
        data: payload.data, 
        redirectUrl
    }));
      this.onSuccess()
    }
  }

  showSpinner() {
    this.loading = true;
    this.baseServ.spinner.show();
  }

  hideSpinner() {
    this.loading = false;
    this.baseServ.spinner.hide();
  }

  actionAvantValidation(): void {}

  formIsInvalid(): boolean {
    return this.formGroup.invalid;
  }

  isInvalid(att: string): boolean {
    return !!this.submit && !!this.form?.["data." + att]?.errors;
  }

  onSuccess() {
    if (this.redirect) {
      this.router.navigateByUrl(this.url); 
    }
    this.hideSpinner();
  }

}
