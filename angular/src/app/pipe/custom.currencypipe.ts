import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { environment } from 'src/environments/environment';


@Pipe({
    name: 'appcurrency',
    standalone: true // si standalone
  })
  export class AppcurrencyPipe implements PipeTransform {
    transform(
        value: number,
        currencyCode: string = environment.currency,
        display:
            | 'code'
            | 'symbol'
            | 'symbol-narrow'
            | string
            | boolean = 'symbol',
        digitsInfo: string = '1.2-2',
        locale: string = 'fr',
    ): string | null {
          // ✅ Vérifie que la valeur est un nombre fini et non nul
    if (!isFinite(value) || value === null || value === undefined) {
      value = 0; // ou retourne null pour masquer
    }
        return formatCurrency(
          value,
          locale,
          getCurrencySymbol(currencyCode, 'wide'),
          currencyCode,
          digitsInfo,
        );
    }
}
