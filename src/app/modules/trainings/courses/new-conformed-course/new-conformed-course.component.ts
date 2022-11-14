import { Selectable } from './../../../../interfaces/selectable.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TrainingsService } from '../../../../services/trainings/trainings.service';
import { ActivatedRoute } from '@angular/router';
import { ComboService } from '../../../../services/combos/combo.service';
import { DatePipe } from '@angular/common';
import { Employee } from '../../../../interfaces/employee.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-new-conformed-course',
  templateUrl: './new-conformed-course.component.html',
  styleUrls: ['./new-conformed-course.component.css']
})
export class NewConformedCourseComponent implements OnInit {

  constructor(private trainingsService: TrainingsService, private comboService: ComboService, public datePipe: DatePipe) { }

  isLinear: boolean = true;
  form1!: UntypedFormGroup;
  form2!: UntypedFormGroup;
  instructors!: Selectable[];
  courses!: Selectable[];
  services!: Selectable[];
  ini_date!: Date | null;
  end_date!: Date | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'Apellido', 'Categoria'];
  dataSource!: MatTableDataSource<Employee>;
  selection = new SelectionModel<Employee>(true, []);

  students_cat!: Employee[];
  typesOfShoes: number[] = [1, 6, 3, 2, 5];

  ngOnInit(): void {
    this.comboService.combo('instructors').subscribe(r => {
      this.instructors = r;
    });
    this.comboService.combo('courses').subscribe(r => {
      this.courses = r;
    });
    this.comboService.combo('services').subscribe(r => {
      this.services = r;
    });
    this.form1 = new UntypedFormGroup({
      instructor: new UntypedFormControl('', Validators.required),
      course: new UntypedFormControl('', Validators.required),
      services: new UntypedFormControl([], Validators.required),
      ini_date: new UntypedFormControl('', Validators.required),
      end_date: new UntypedFormControl('', Validators.required),
      ini_time: new UntypedFormControl('', Validators.required),
      end_time: new UntypedFormControl('', Validators.required),
      online: new UntypedFormControl(1, Validators.required),
      students: new UntypedFormControl([]),
    });
    // this.form2 = new FormGroup({
    //   students: new FormControl([], Validators.required),
    // });
  }

  ngAfterViewInit() {
    if (!!this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  updateFormDate(event: any, controlName: string) {
    //console.log(event);
    switch (controlName) {
      case "ini": this.form1.get('ini_date')?.setValue(event); break;
      case "end": this.form1.get('end_date')?.setValue(event);
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

}
