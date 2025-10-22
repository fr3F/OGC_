import { AbstractControl, ValidationErrors } from '@angular/forms';
import { DateUtilsService } from './date-utils.service';

const dateUtils = new DateUtilsService(); // Utilisation directe du service utils

export const dateValidator = (formGroup: AbstractControl): ValidationErrors | null => {
  const errors: any = {};

  const dateDebutStr = formGroup.get('date_debut_conge')?.value;
  const dateFinStr = formGroup.get('date_fin_conge')?.value;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDateDebut = dateUtils.addBusinessDays(today, 5);

  // Vérifier la date de début
  if (dateDebutStr) {
    const dateDebut = new Date(dateDebutStr);

    if (dateDebut < minDateDebut) {
      errors.dateDebut5jourAvant = true;
    }
    if (dateUtils.isSunday(dateDebut)) {
      errors.dateDebutDimanche = true;
    }
  }

  // Vérifier la date de fin
  if (dateFinStr) {
    const dateFin = new Date(dateFinStr);
    if (dateUtils.isSunday(dateFin)) {
      errors.dateFinDimanche = true;
    }
  }

  // Vérifier que date fin >= date début
  if (dateDebutStr && dateFinStr) {
    const dateDebut = new Date(dateDebutStr);
    const dateFin = new Date(dateFinStr);
    if (dateFin < dateDebut) {
      errors.dateFinBeforeDebut = true;
    }
  }

  return Object.keys(errors).length ? errors : null;
};
