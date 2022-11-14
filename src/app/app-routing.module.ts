import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'config',
        loadChildren: () => import('./modules/config/config.module').then(m => m.ConfigModule),
      },
      {
        path: 'system',
        loadChildren: () => import('./modules/system/system.module').then(m => m.SystemModule),
      },
      {
        path: 'trainings',
        loadChildren: () => import('./modules/trainings/trainings.module').then(m => m.TrainingsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
