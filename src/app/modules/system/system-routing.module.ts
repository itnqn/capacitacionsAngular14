import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRolComponent } from './roles/edit-rol/edit-rol.component';
import { ListRolComponent } from './roles/list-rol/list-rol.component';
import { NewRolComponent } from './roles/new-rol/new-rol.component';
import { RolPermissionsComponent } from './roles/rol-permissions/rol-permissions.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { NewUserComponent } from './user/new-user/new-user.component';

const routes: Routes = [
    // {
    //   path: '',
    //   redirectTo: '',
    //   pathMatch: 'full',
    // },
    {
      path: 'users/list',
      component: ListUserComponent
    },
    {
      path: 'users/new',
      component: NewUserComponent
    },
    {
      path: 'users/edit/:id',
      component: EditUserComponent
    },
    {
      path: 'roles/list',
      component: ListRolComponent
    },
    {
      path: 'roles/new',
      component: NewRolComponent
    },
    {
      path: 'roles/edit/:id',
      component: EditRolComponent
    },
    {
      path: 'permissions',
      component: RolPermissionsComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes), RouterModule],
    exports: [RouterModule]
  })
  export class SystemRoutingModule { }