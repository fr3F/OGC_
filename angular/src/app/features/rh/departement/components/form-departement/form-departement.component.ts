import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Departement } from '../../model/departement.model';
import { DepartementService } from '../../services/departement.service';

@Component({
  selector: 'app-form-departement',
  templateUrl: './form-departement.component.html',
  styleUrls: ['./form-departement.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
})
export class FormDepartementComponent extends BaseFormComponent {
  @Input() data!: Departement;

  private departementService = inject(DepartementService);

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nom_dep: [this.data?.nom_dep, [Validators.required]],
    });
  }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const flattenedData = { ...this.formGroup.value, id: this.data?.id };
    const payload = {
      data: flattenedData,
      nomModele: this.departementService.nomModele,
    };  

    const redirectUrl = '/departement';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }
}
