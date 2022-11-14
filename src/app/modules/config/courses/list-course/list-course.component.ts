import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../../../services/config/config.service';
import { Course } from '../../../../interfaces/course.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'btn'];
  dataSource!: MatTableDataSource<Course>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderTabla();
    if (!!this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private renderTabla() {
    this.configService.listCourses().subscribe(r => {
      //console.log(r);
      this.dataSource = new MatTableDataSource<Course>(r);
      this.paginator.length = r.length;
    });
  }

}
