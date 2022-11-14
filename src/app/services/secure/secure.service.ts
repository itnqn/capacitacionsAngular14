import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  private data : any;
  private employee_id : number = 0;

  constructor(private _http : HttpClient) {
    
   }

  setToken(data: any) {
    sessionStorage.setItem("token", JSON.stringify(data));
    //sessionStorage.setItem("token", JSON.stringify(token));
  }

  getToken(){
    sessionStorage.getItem("token");
  }

  getEmployeeId(){
    this.data =  sessionStorage.getItem("token");    
    return this.employee_id = JSON.parse(this.data).employee_id
  }
 

  sessionDestroy(){
    sessionStorage.clear(); 
  }
}
