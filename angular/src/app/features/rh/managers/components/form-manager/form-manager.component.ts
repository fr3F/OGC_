import { Component, Input, inject } from '@angular/core';
import { BaseFormComponent } from 'src/app/core/base/base-form/base-form.component';
import { ManagersService } from '../../services/managers.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Manager } from '../../models/manager.model';
import { CommonModule } from '@angular/common';
import { ComptesService } from '../../../compte/services/compte.service';

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
  managers
  comptes
  
  private managerService = inject(ManagersService);
  private ComptesService = inject(ComptesService)

  ngOnInit(): void {
    this.buildForm();
    this.getAllManager();
    this.getAllCompte()
  }
  buildForm(): void {
    this.formGroup = this.formBuilder.group({
      nom_manager: [this.data?.nom_manager, [Validators.required]],
      id_manager: [this.data?.id_manager],
      login: [this.data?.login, [Validators.required]]
    });
  }

  getAllManager(){
    this.managerService.getAll().subscribe((r)=>{
            console.log("Manager", r);

      this.managers = r})
  }
  getAllCompte(){
    this.ComptesService.getAll().subscribe((r)=>{
      this.comptes = r
      
    })
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
