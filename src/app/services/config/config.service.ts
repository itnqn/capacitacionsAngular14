import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';
import { Instructor } from '../../interfaces/instructor.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url = environment.url;

  constructor(private httpClient: HttpClient) { }

  newCourse(course: Course): Observable<any> {
    return this.httpClient.post(this.url + 'courses/new', course);
  }

  listCourses(): Observable<any> {
    return this.httpClient.get(this.url + 'courses');
  }

  getCourse(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'courses/' + id)
  }

  newInstructor(instructor: Instructor): Observable<any> {
    return this.httpClient.post(this.url + 'instructors/new', instructor);
  }

  listInstructors(): Observable<any> {
    return this.httpClient.get(this.url + 'instructors');
  }

  getInstructor(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'instructors/' + id)
  }

  listEmployees(params: any): Observable<any> {
    // * pensado para SSP
    return this.httpClient.post(this.url + 'employee', params);
  }

}
