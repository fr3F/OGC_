import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { ManagersService } from '../../services/managers.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Manager } from '../../models/manager.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
})
export class FormManagerComponent extends BaseFormComponent {
  @Input() data!: Manager;

  private managerService = inject(ManagersService);

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nom_manager: [this.data?.nom_manager, [Validators.required]],
    });
  }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const flattenedData = { ...this.formGroup.value, id: this.data?.id };
    const payload = {
      data: flattenedData,
      nomModele: this.managerService.nomModele,
    };  

    const redirectUrl = '/manager';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }
}
