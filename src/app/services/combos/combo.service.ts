import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  url = environment.url;

  employees = "employeelistcombo";
  roles = "roles";
  permissions = "permissions";
  instructors = "instructorscombo";
  courses = "courses";
  services = "services";

  constructor(private httpClient: HttpClient) { }

  combo(tabla: string): Observable<any> {
    let selected = "";
    switch (tabla) {
      case 'employee': selected = this.employees; break;
      case 'roles': selected = this.roles; break;
      case 'permissions': selected = this.permissions; break;
      case 'instructors': selected = this.instructors; break;
      case 'courses': selected = this.courses; break;
      case 'services': selected = this.services; break;
      default: break;
    }
    return this.httpClient.get(this.url + selected);
  }
}
