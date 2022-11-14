
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrainingsService } from 'src/app/services/trainings/trainings.service';
import { AvailableCourses} from '../../../../interfaces/available-courses.interface';
import { SecureService } from 'src/app/services/secure/secure.service';

@Component({
  selector: 'app-available-courses-list',
  templateUrl: './available-courses-list.component.html',
  styleUrls: ['./available-courses-list.component.css']
})
export class AvailableCoursesListComponent implements OnInit {

  courses : AvailableCourses[] = [];
  spinners : boolean = true;
  cursado : boolean = false;
  color = 'primary';
   modes = 'indeterminate';
   diameter = 10;

   data : any;
   uuid : any;

  constructor(
    private _sanitizer: DomSanitizer, 
    private _trainings : TrainingsService,
    private _secure : SecureService,
    
    ) { 
      
    
  }

  apiLoaded = false;


  ngOnInit(): void {
    this.getAvailablesCourses();
  }

  getAvailablesCourses(){
    let employee_id = this._secure.getEmployeeId();
    this._trainings.availablesCourses({employee_id : employee_id}).subscribe(res=>{
      console.log(res)
      this.courses = res;
    });
  }




}
