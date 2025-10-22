import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  /**
   * Calcule le nombre de jours entre deux dates (inclusif)
   */
  calculateDaysDifference(dateDebut: string | Date, dateFin: string | Date): number {
    if (!dateDebut || !dateFin) return 0;

    const start = new Date(dateDebut);
    const end = new Date(dateFin);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays < 0 ? 0 : diffDays + 1;
  }

  addBusinessDays(startDate: Date, days: number): Date {
    const result = new Date(startDate);
    let addedDays = 0;

    while (addedDays < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0) { 
        addedDays++;
      }
    }

    return result;
  }


  isSunday(date: Date): boolean {
    return date.getDay() === 0;
  }
}
