import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Instructor } from '../../../../interfaces/instructor.interface';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'app-list-instructor',
  templateUrl: './list-instructor.component.html',
  styleUrls: ['./list-instructor.component.css']
})
export class ListInstructorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'unique_code', 'email', 'phone', 'address', 'btn'];
  dataSource!: MatTableDataSource<Instructor>;
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
    this.configService.listInstructors().subscribe(r => {
      console.log(r);
      this.dataSource = new MatTableDataSource<Instructor>(r);
      this.paginator.length = r.length;
    });
  }

}
