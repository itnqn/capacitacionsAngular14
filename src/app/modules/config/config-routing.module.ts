import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { ListCourseComponent } from './courses/list-course/list-course.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { EditInstructorComponent } from './instructors/edit-instructor/edit-instructor.component';
import { ListInstructorComponent } from './instructors/list-instructor/list-instructor.component';
import { NewInstructorComponent } from './instructors/new-instructor/new-instructor.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  {
    path: 'courses/list',
    component: ListCourseComponent
  },
  {
    path: 'courses/new',
    component: NewCourseComponent
  },
  {
    path: 'courses/edit/:id',
    component: EditCourseComponent
  },
  {
    path: 'instructors/list',
    component: ListInstructorComponent
  },
  {
    path: 'instructors/new',
    component: NewInstructorComponent
  },
  {
    path: 'instructors/edit/:id',
    component: EditInstructorComponent
  },
  {
    path: 'employees/list',
    component: ListEmployeeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }