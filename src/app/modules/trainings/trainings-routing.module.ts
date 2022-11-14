import { ResourcesComponent } from './courses/resources/resources.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditConformedCourseComponent } from './courses/edit-conformed-course/edit-conformed-course.component';
import { ListConformedCoursesComponent } from './courses/list-conformed-courses/list-conformed-courses.component';
import { NewConformedCourseComponent } from './courses/new-conformed-course/new-conformed-course.component';
import { AvailableCoursesListComponent } from './availableCourses/available-courses-list/available-courses-list.component';
import { QuestionsComponent } from './courses/questions/questions.component';
import { TakeExamComponent } from './availableCourses/take-exam/take-exam.component';
import { TakeCourseComponent } from './availableCourses/take-course/take-course.component';

const routes: Routes = [
    // {
    //   path: '',
    //   redirectTo: '',
    //   pathMatch: 'full',
    // },
    {
        path: 'conformed-courses/list',
        component: ListConformedCoursesComponent
    },
    {
        path: 'conformed-courses/new',
        component: NewConformedCourseComponent
    },
    {
        path: 'conformed-courses/edit/:id',
        component: EditConformedCourseComponent
    },
    {
        path: 'conformed-courses/questions/:id',
        component: QuestionsComponent
    },
    {
        path: 'conformed-courses/resources/:id',
        component: ResourcesComponent
    },
    {
        path : 'available-courses',
        component : AvailableCoursesListComponent
    },
    {
        path : 'take-course/:uuid',
        component : TakeCourseComponent
    },
    {
        path : 'take-exam',
        component : TakeExamComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes), RouterModule],
    exports: [RouterModule]
})
export class TrainingsRoutingModule { }