import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: Pages.List,
    pathMatch: 'full',
  },
  {
    path: Pages.List,
    loadChildren: () => import('./list/list.module').then(m => m.ListModule),
  },
  {
    // otherwise redirect to home
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
