import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { SecureService } from '../services/secure/secure.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  employee_id : any;

  mobileQuery!: MediaQueryList;

  modules = [
    {
      name: 'Cursos',
      icon: 'school',
      description: '',
      id: 1,
      link: 'trainings',
      submodules: [{
        name: 'Listado',
        link: 'conformed-courses/list',
        id: 1,
        id_module: 1,
      },
      {
        name: 'Cursos disponibles',
        link: 'available-courses',
        id: 1,
        id_module: 1,
      }]
    },    
    {
      name: 'Configuraciones',
      icon: 'settings',
      description: 'Listados, altas, bajas, modificaciones...',
      id: 2,
      link: 'config',
      submodules: [{
        name: 'Cursos',
        link: 'courses/list',
        id: 1,
        id_module: 2,
      },
      {
        name: 'Instructores',
        link: 'instructors/list',
        id: 2,
        id_module: 2,
      },
      {
        name: 'Empleados',
        link: 'employees/list',
        id: 3,
        id_module: 2,
      },
      ]
    },
    {
      name: 'Sistema',
      icon: 'computer',
      description: 'Ajustes varios del sistema...',
      id: 3,
      link: 'system',
      submodules: [{
        name: 'Roles',
        link: 'roles/list',
        id: 1,
        id_module: 3,
      },
      {
        name: 'Usuarios',
        link: 'users/list',
        id: 2,
        id_module: 3,
      }
      ]
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _secure : SecureService
    ) {
      this._secure.setToken({employee_id : 430});

      this.employee_id = this._secure.getEmployeeId();
     }

    

}
