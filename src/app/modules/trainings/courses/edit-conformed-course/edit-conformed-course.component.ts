import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee.interface';
import { Selectable } from 'src/app/interfaces/selectable.interface';
import { TrainingsService } from '../../../../services/trainings/trainings.service';
import { DatePipe } from '@angular/common';
import { ComboService } from 'src/app/services/combos/combo.service';
import { MatCalendar, MatCalendarView, MatMonthView } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-conformed-course',
  templateUrl: './edit-conformed-course.component.html',
  styleUrls: ['./edit-conformed-course.component.css']
})
export class EditConformedCourseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private trainingsService: TrainingsService, public datePipe: DatePipe, private comboService: ComboService) { }

  isLinear: boolean = true;
  isDisabled: boolean = false;
  instructors!: Selectable[];
  courses!: Selectable[];
  services!: Selectable[];
  tipos = [{ value: 0, name: 'Presencial' }, { value: 1, name: 'Online' }];
  idEdicion = this.route.snapshot.params.id;

  ini!: Date;
  end!: Date;
  ini_month: number = (new Date()).getMonth();
  end_month: number = (new Date()).getMonth();

  @ViewChild('ini') calendar_ini!: MatCalendar<Date>;
  iniStartView!: MatCalendarView;
  @ViewChild('end') calendar_end!: MatCalendar<Date>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'Apellido', 'Categoria'];
  dataSource!: MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);

  submitPressed: boolean = false;
  form1 = new UntypedFormGroup({
    instructor_id: new UntypedFormControl('', Validators.required),
    course: new UntypedFormControl('', Validators.required),
    services: new UntypedFormControl([], Validators.required),
    ini_date: new UntypedFormControl('', Validators.required),
    end_date: new UntypedFormControl('', Validators.required),
    ini_time: new UntypedFormControl('', Validators.required),
    end_time: new UntypedFormControl('', Validators.required),
    online: new UntypedFormControl(1, Validators.required),
    students: new UntypedFormControl([]),
    course_uuid: new UntypedFormControl(''),
  });

  ngOnInit(): void {
    let idEdit = this.route.snapshot.params.id;
    this.comboService.combo('instructors').subscribe(r => {
      this.instructors = r;
    });
    this.comboService.combo('courses').subscribe(r => {
      this.courses = r;
    });
    this.comboService.combo('services').subscribe(r => {
      this.services = r;
    });
    this.trainingsService.getConformedCourse(idEdit).subscribe(r => {
      console.log(r);
      //this.form1.patchValue(r);
      let course = r.conformed_course[0];
      this.form1.get('course')?.setValue(course.courses_id);
      this.form1.get('online')?.setValue(course.online);
      this.ini = new Date(course.beginning);
      this.end = new Date(course.finish);
      this.form1.get('ini_date')?.setValue(this.ini);
      this.form1.get('end_date')?.setValue(this.end);
      this.calendar_ini.activeDate = this.ini;
      this.calendar_end.activeDate = this.end;

      this.form1.get('instructor_id')?.setValue(course.instructor_id);

      let cats: number[] = new Array();
      r.categories.map((val: any) => {
        if (!cats.includes(val.category_id)) {
          cats.push(val.category_id);
        }
      });

      this.trainingsService.listStundentsByServices({ services: cats }).subscribe(r2 => {
        this.dataSource = new MatTableDataSource<Employee>(r2);
        this.paginator.length = r2.length;
        this.dataSource.paginator = this.paginator;
        let employees_id_array = r.employee.map((employee: { id: any; }) => employee.id);
        this.dataSource.data.forEach(row => {
          if (employees_id_array.includes(row.id)) this.selection.select(row);
        });
      });

      console.log(course.instructor_id);

      this.form1.get('services')?.setValue(cats);

      

      this.form1.get('ini_time')?.setValue(course.beginning_time);
      this.form1.get('end_time')?.setValue(course.finish_time);

      this.isDisabled = false;

    });
  }

  updateFormDate(event: any, controlName: string) {
    //console.log(event);
    switch (controlName) {
      case "ini": this.form1.get('ini_date')?.setValue(event);
        break;
      case "end": this.form1.get('end_date')?.setValue(event);
        break;
    }
  }

  stepper1Triggered() {
    // console.log(this.form1.value);
    // console.log(this.form1.valid);
    //console.log(this.form1.get('services')?.value);
    let params = {
      services: this.form1.get('services')?.value,
    }
    //console.log(params);
    this.trainingsService.listStundentsByServices(params).subscribe(r => {
      //console.log(r);
      this.dataSource = new MatTableDataSource<Employee>(r);
      this.paginator.length = r.length;
      this.dataSource.paginator = this.paginator;
      this.selection.clear();
    });
  }

  stepper2Triggered() {
    //console.log(this.selection.selected);
    let sel = this.selection.selected.map(a => a.id);
    this.form1.get('students')?.setValue(sel);
    //this.form
    //console.log(this.form2.get('students')?.value);
  }

  submit() {
    //this.form1.get('students')?.setValue(this.form2.get('students')?.value);
    let ini_date_format = this.datePipe.transform(this.form1.get('ini_date')?.value, 'yyyy-MM-dd');
    let end_date_format = this.datePipe.transform(this.form1.get('end_date')?.value, 'yyyy-MM-dd');
    this.form1.get('ini_date')?.setValue(ini_date_format);
    this.form1.get('end_date')?.setValue(end_date_format);
    this.form1.get('course_uuid')?.setValue(this.idEdicion);
    console.log(this.form1.value);
    this.trainingsService.newConformedCourse(this.form1.value).subscribe(r => {
      console.log(r);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    //console.log(this.dataSource);
    if (!!this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    } else {
      return false;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    if (!!this.dataSource) {
      this.selection.select(...this.dataSource.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  check(row: any, event: any) {
    let params = {
      employee_id: row.id,
      course_uuid: this.idEdicion,
    };
    if (event.checked) {
      this.selection.toggle(row);
      this.trainingsService.updateStudentInCourse('insert', params).subscribe(r => {
        console.log(r);
      });
    } else {
      this.trainingsService.updateStudentInCourse('delete', params).subscribe(r => {
        console.log(r);
      });
    }
  }
}
