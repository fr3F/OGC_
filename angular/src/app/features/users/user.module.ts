import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModuleComponent } from './components/user/user.module';

@NgModule({
  declarations: [
    // UserslistComponent,
    // UseraddComponent,
    // UserUpdatePasswordComponent,
    // AccesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserModuleComponent,
    NgxPaginationModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }

