import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './user/list-user/list-user.component';
import { NewUserComponent } from './user/new-user/new-user.component';

// * material
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { SystemRoutingModule } from './system-routing.module';
import { ListRolComponent } from './roles/list-rol/list-rol.component';
import { NewRolComponent } from './roles/new-rol/new-rol.component';
import { EditRolComponent } from './roles/edit-rol/edit-rol.component';
import { RolPermissionsComponent } from './roles/rol-permissions/rol-permissions.component';

@NgModule({
  declarations: [
    ListUserComponent,
    NewUserComponent,
    EditUserComponent,
    ListRolComponent,
    NewRolComponent,
    EditRolComponent,
    RolPermissionsComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SystemModule { }
