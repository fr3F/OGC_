import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Compte } from '../../models/compte.model';
import { ComptesService } from '../../services/compte.service';

@Component({
  selector: 'app-form-compte',
  templateUrl: './form-compte.component.html',
  styleUrls: ['./form-compte.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
})
export class FormcompteComponent extends BaseFormComponent {
  @Input() data!: Compte;

  private compteService = inject(ComptesService);

  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      login: [this.data?.login, [Validators.required]],
      type: [this.data?.type, [Validators.required]],
    });
  }

  valider() {
    this.submit = true;
    if (this.formGroup.invalid) return;

    const flattenedData = { ...this.formGroup.value, id: this.data?.login };
    const payload = {
      data: flattenedData,
      nomModele: this.compteService.nomModele,
    };  

    const redirectUrl = '/compte';
    super.storeAction(payload, redirectUrl);
    this.onValidate.emit();
  }
  
}
