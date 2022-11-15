import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {

  url = environment.url;

  constructor(private httpClient: HttpClient) { }

  listConformedCourses(params: any): Observable<any> {
    // * pensado para SSP
    return this.httpClient.post(this.url + 'conformedcourses', params);
  }

  listStundentsByServices(params: any): Observable<any> {
    return this.httpClient.post(this.url + 'employeebycategory', params);
  }

  newConformedCourse(params: any): Observable<any> {
    return this.httpClient.post(this.url + "conformedcourses/new", params);
  }

  getConformedCourse(course_uuid: string | number): Observable<any> {
    return this.httpClient.post(this.url + 'conformedcourses/edit', { uuid: course_uuid })
  }

  updateStudentInCourse(method: string, params: any): Observable<any> {
    return this.httpClient.post(this.url + "conformedcourses/student/" + method, params);
  }

  questions(uuid : any):Observable<any>{
    return this.httpClient.get(this.url + 'questions/' + uuid)
  }

  generateQuestions(data : any):Observable<any>{
    return this.httpClient.post(this.url + 'questions/new', data)
  }

  generateAnswer(data : any) : Observable<any>{
    return this.httpClient.post(this.url + 'answer/new', data);
  }

  deleteAnswer(data: any) : Observable<any>{
    return this.httpClient.post(this.url + 'answer/delete', data);
  }

  availablesCourses(data : any) : Observable <any>{
    return this.httpClient.post(this.url + 'available-courses', data);
  }


  /********************************************
   * resources
   */

  getAllResources(uuid : string):Observable<any>{
    return this.httpClient.get(this.url + 'courses-video/' + uuid);
  }

  coursesVideo(data : any):Observable<any>{
    return this.httpClient.post(this.url + 'courses-video', data);
  }

  resourcesDelete(id : any) : Observable<any>{
    return this.httpClient.delete(this.url + 'courses-video/' + id);
  }

  coursesFiles(data : any):Observable<any>{
    return this.httpClient.post(this.url + '', data);
  }

  /********************************************
   * take courses
   */

  takeCourse(uuid : any):Observable<any>{
    return this.httpClient.get(this.url + 'courses-video/take/' + uuid)
  }


}
