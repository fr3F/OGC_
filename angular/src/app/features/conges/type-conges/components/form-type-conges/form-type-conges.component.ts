import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypeConges } from '../../models/type-conges.model';
import { TypeCongeService } from '../../services/type_conge.service';

@Component({
  selector: 'app-form-type-conges',
  templateUrl: './form-type-conges.component.html',
  styleUrls: ['./form-type-conges.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
})
export class FormTypeCongesComponent extends BaseFormComponent {
  @Input() data!: TypeConges;

  private typeCongeService = inject(TypeCongeService);

  
  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nom_type_conge: [this.data?.nom_type_conge, [Validators.required]],
      max_jour: [this.data?.max_jour],
    });
  }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const flattenedData = { ...this.formGroup.value, id: this.data?.id };
    const payload = {
      data: flattenedData,
      nomModele: this.typeCongeService.nomModele,
    };  

    const redirectUrl = '/type-conges';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }
}
