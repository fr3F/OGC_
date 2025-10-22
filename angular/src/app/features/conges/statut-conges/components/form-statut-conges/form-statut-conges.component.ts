import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { StatutCongeService } from '../../services/statut_conge.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatutConges } from '../../models/statut-conges.model';

@Component({
  selector: 'app-form-statut-conges',
  templateUrl: './form-statut-conges.component.html',
  styleUrls: ['./form-statut-conges.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
})
export class FormStatutCongesComponent extends BaseFormComponent {
  @Input() data!: StatutConges;

  private statutCongeService = inject(StatutCongeService);

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nom_status_conge: [this.data?.nom_status_conge, [Validators.required]],
    });
  }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const flattenedData = { ...this.formGroup.value, id: this.data?.id };
    const payload = {
      data: flattenedData,
      nomModele: this.statutCongeService.nomModele,
    };  

    const redirectUrl = '/statut-conges';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }
}
