import { NgModule } from '@angular/core';

import { ExtrapagesRoutingModule } from './extrapages-routing.module';
import { Page403Component } from './page403/page403.component';

@NgModule({
  declarations: [
    Page403Component
  ],
  imports: [
    ExtrapagesRoutingModule,
  ]
})
export class ExtrapagesModule { }
