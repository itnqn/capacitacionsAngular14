import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingsService } from '../../../../services/trainings/trainings.service';
import { ConformedCourse } from '../../../../interfaces/conformed-course.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-conformed-courses',
  templateUrl: './list-conformed-courses.component.html',
  styleUrls: ['./list-conformed-courses.component.css']
})
export class ListConformedCoursesComponent implements OnInit {

  constructor(private trainingsService: TrainingsService) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'online', 'beginning', 'btn', 'btn2', 'btn3', 'btn4'];
  dataSource!: MatTableDataSource<ConformedCourse>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;
  @ViewChild('filter') filter!: ElementRef;
  loading: boolean = true;
  badgehidden: boolean = false;

  ngAfterViewInit() {
    this.renderTabla();
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        tap((text) => {
          //console.log(this.filter.nativeElement.value)
          this.renderTabla();
        })
      )
      .subscribe();
    if (!!this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private renderTabla(pageIndex = 0, pageSize = 10) {
    this.loading = true;
    let params = { pageIndex: pageIndex, pageSize: pageSize, filter: this.filter.nativeElement.value }
    //console.log(params);
    this.trainingsService.listConformedCourses(params).subscribe(r => {
      console.log(r.data);
      this.dataSource = new MatTableDataSource<ConformedCourse>(r.data);
      this.paginator.length = r.total;
      this.loading = false;
    });
  }

  cambioPagina(event: any) {
    //console.log(event);
    let pageIndex = event.pageIndex + 1;
    let pageSize = event.pageSize;
    this.renderTabla(pageIndex, pageSize);
  }

  checkDate(beginning: any): boolean {
    let ini = new Date(beginning);
    let today = new Date();
    if (ini.getTime() < today.getTime()) {
      return true;
    } else {
      return false;
    }
  }

}
