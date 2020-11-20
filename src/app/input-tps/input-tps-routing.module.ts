import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputTpsPage } from './input-tps.page';

const routes: Routes = [
  {
    path: '',
    component: InputTpsPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputTpsPageRoutingModule {}
