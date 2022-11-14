import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from 'src/app/services/config/config.service';
import { Employee } from '../../../../interfaces/employee.interface';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  displayedColumns: string[] = ['id', 'Apellido', 'Legajo']; //, 'btn'
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;
  @ViewChild('filter') filter!: ElementRef;
  loading: boolean = true;

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

  ngOnInit(): void {
  }

  private renderTabla(pageIndex = 0, pageSize = 10) {
    this.loading = true;
    let params = { pageIndex: pageIndex, pageSize: pageSize, filter: this.filter.nativeElement.value }
    //console.log(params);
    this.configService.listEmployees(params).subscribe(r => {
      //console.log(r);
      this.dataSource = new MatTableDataSource<Employee>(r.data);
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



}
