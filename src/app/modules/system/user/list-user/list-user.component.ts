import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/interfaces/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SystemService } from '../../../../services/system/system.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit{

  constructor(private systemService: SystemService) { }

  displayedColumns: string[] = ['id', 'employee', 'email', 'enabled', 'btn'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;

  ngAfterViewInit() {
    this.renderTabla();
    if (!!this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
  }

  private renderTabla(pageIndex = 0, pageSize = 10) {
    let params = { pageIndex: pageIndex, pageSize: pageSize }
    this.systemService.listUsers(params).subscribe(r => {
      console.log(r);
      this.dataSource = new MatTableDataSource<User>(r.data);
      this.paginator.length = r.total;
    });
  }

  cambioPagina(event: any) {
    //console.log(event);
    let pageIndex = event.pageIndex + 1;
    let pageSize = event.pageSize;
    this.renderTabla(pageIndex, pageSize);
  }

}
