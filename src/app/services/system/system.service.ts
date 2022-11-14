import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/interfaces/role.interface';
import { User } from 'src/app/interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  url = environment.url;

  constructor(private httpClient: HttpClient) { }

  listUsers(params: any): Observable<any> {
    // * pensado para SSP
    return this.httpClient.post(this.url + 'users', params);
  }

  newUser(user: any): Observable<any> {
    return this.httpClient.post(this.url + 'users/new', user);
  }

  uploadImage(image : any):Observable<any>{
    return this.httpClient.post(this.url + 'users/upload', image);
  }

  getUser(id: string | number): Observable<any> {
    return this.httpClient.get(this.url + 'users/' + id)
  }

  listEmployees(params: any): Observable<any> {
    // * solo empleados habilitados, con SSP
    return this.httpClient.post(this.url + 'employee', params);
  }

  listroles(): Observable<any> {
    return this.httpClient.get(this.url + 'roles');
  }

  newRol(rol: Rol): Observable<any> {
    return this.httpClient.post(this.url + 'roles/new', rol);
  }

  getRol(id: string | number): Observable<any> {
    return this.httpClient.get(this.url + 'roles/' + id)
  }

  listInstructors(): Observable<any> {
    // * pensado para SSP
    return this.httpClient.get(this.url + 'instructors');
  }

  roleshaspermissions(id : number):Observable<any>{
    return this.httpClient.get(this.url + 'roleshaspermissions/' + id)
  }

  onOffCheck(data : any):Observable<any>{
    return this.httpClient.post(this.url + "permissions/createdelete", data);
  }

}
