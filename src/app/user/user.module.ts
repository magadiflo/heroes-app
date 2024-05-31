import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserBasicComponent } from './user-basic/user-basic.component';
import { LayoutUserComponent } from './layout-user/layout-user.component';


@NgModule({
  declarations: [
    UserAdminComponent,
    UserBasicComponent,
    LayoutUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
