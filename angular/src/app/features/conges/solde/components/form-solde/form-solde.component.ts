import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Solde } from '../../models/solde.model';
import { SoldeService } from '../../services/solde.service';
import { CollaborateurService } from 'src/app/features/rh/collaborateurs/service/collaborateur.service';
import { TypeCongeService } from '../../../type-conges/services/type_conge.service';

@Component({
  selector: 'app-form-solde',
  templateUrl: './form-solde.component.html',
  styleUrls: ['./form-solde.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
})
export class FormSoldeComponent extends BaseFormComponent {
  @Input() data!: Solde;

  private soldeService = inject(SoldeService);
  private collabService = inject(CollaborateurService)
  private typeCongeService = inject(TypeCongeService)
  collaborateurs = []
  typesConge = []

  ngOnInit(): void {
    this.buildForm(); 
    this.getAllCollab();
    this.getTypeConge()
  }

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      prix: [this.data?.prix, [Validators.required]],
      id_type_conge: [this.data?.id_type_conge, [Validators.required]],
      id_collab: [this.data?.id_collab, [Validators.required]],
    });
  }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const flattenedData = { ...this.formGroup.value, id: this.data?.id };
    const payload = {
      data: flattenedData,
      nomModele: this.soldeService.nomModele,
    };  

    const redirectUrl = '/solde';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }

  getAllCollab() {
    this.collabService.getAllCollab().subscribe({
      next: (res: any) => {
        console.log("res collab", res);        
        this.collaborateurs = res;
      },
      error: (err) => this.notif.error(err),
    });
  }

  getTypeConge(){
    this.typeCongeService.getAll().subscribe({
      next:(res: any)=>{
        console.log("res type Congés", res);
        
        this.typesConge = res
      },
      error:(err) => this.notif.error(err),
    })
  }

}
