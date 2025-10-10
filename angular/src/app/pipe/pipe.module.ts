import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { AppcurrencyPipe } from './custom.currencypipe';
import { CapitalizeFirstPipe } from './capitalizeFirst.pipe';


@NgModule({
  declarations: [
    SafePipe, 
    CapitalizeFirstPipe
  ],
  imports: [
  ],
  exports: [
    SafePipe,
    CapitalizeFirstPipe
  ]
})
export class PipeModule { 

}
