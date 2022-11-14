import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ListInstructorComponent } from './instructors/list-instructor/list-instructor.component';
import { NewInstructorComponent } from './instructors/new-instructor/new-instructor.component';
import { EditInstructorComponent } from './instructors/edit-instructor/edit-instructor.component';

// * material
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListCourseComponent } from './courses/list-course/list-course.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [

    ListInstructorComponent,
    NewInstructorComponent,
    EditInstructorComponent,
    ListCourseComponent,
    NewCourseComponent,
    EditCourseComponent,
    ListEmployeeComponent
  ],
  imports: [
    ConfigRoutingModule,
    CommonModule,
    HttpClientModule,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    NgSelectModule,
    FormsModule,
    MatProgressBarModule
  ]
})
export class ConfigModule { }
