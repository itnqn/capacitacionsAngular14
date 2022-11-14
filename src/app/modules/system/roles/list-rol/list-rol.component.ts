import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../../../../services/system/system.service';
import { Rol } from '../../../../interfaces/role.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.css']
})
export class ListRolComponent implements OnInit {

  constructor(private systemService: SystemService) { }

  displayedColumns: string[] = ['id', 'name', 'guard_name', 'enabled', 'btn'];
  dataSource!: MatTableDataSource<Rol>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderTabla();
    if (!!this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  renderTabla() {
    this.systemService.listroles().subscribe(r => {
      this.dataSource = new MatTableDataSource<Rol>(r);
      this.paginator.length = r.length;
    });
  }

}
