import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListConformedCoursesComponent } from './courses/list-conformed-courses/list-conformed-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TrainingsRoutingModule } from './trainings-routing.module';
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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { NewConformedCourseComponent } from './courses/new-conformed-course/new-conformed-course.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EditConformedCourseComponent } from './courses/edit-conformed-course/edit-conformed-course.component';
import { QuestionsComponent } from './courses/questions/questions.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatRadioModule} from '@angular/material/radio';
import { AvailableCoursesListComponent } from './availableCourses/available-courses-list/available-courses-list.component';
import { TakeCourseComponent } from './availableCourses/take-course/take-course.component';
import { TakeExamComponent } from './availableCourses/take-exam/take-exam.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ResourcesComponent } from './courses/resources/resources.component';

import {YouTubePlayerModule} from '@angular/youtube-player';
import { PlyrModule } from 'ngx-plyr';


@NgModule({
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    DatePipe
  ],
  declarations: [
    ListConformedCoursesComponent,
    NewConformedCourseComponent,
    EditConformedCourseComponent,
    QuestionsComponent,
    AvailableCoursesListComponent,
    TakeCourseComponent,
    TakeExamComponent,
    ResourcesComponent,
  ],
  imports: [
    CommonModule,
    TrainingsRoutingModule,
    NgSelectModule,
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
    MatProgressBarModule,
    MatBadgeModule,
    MatStepperModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    YouTubePlayerModule,
    PlyrModule
  ]
})
export class TrainingsModule { }
