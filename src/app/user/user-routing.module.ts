import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutUserComponent } from './layout-user/layout-user.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserBasicComponent } from './user-basic/user-basic.component';

const isRole = (role: string) => {
  const storedRole = localStorage.getItem('role');
  return role === storedRole;
};

const routes: Routes = [
  {
    path: '',
    component: LayoutUserComponent,
    children: [
      {
        path: '',
        component: UserAdminComponent,
        canMatch: [() => isRole('admin')],
      },
      {
        path: '',
        component: UserBasicComponent,
        canMatch: [() => isRole('user')],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
