import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "input-tps",
        children: [
          {
            path: "",
            loadChildren: () => import('../input-tps/input-tps.module').then(m => m.InputTpsPageModule)
          }
        ]
      },
      {
        path: "history",
        children: [
          {
            path: "",
            loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: '/app/tabs/input-tps',
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: '/app/tabs/input-tps',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
