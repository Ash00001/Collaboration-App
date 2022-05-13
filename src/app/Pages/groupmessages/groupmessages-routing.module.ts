import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupmessagesPage } from './groupmessages.page';

const routes: Routes = [
  {
    path: '',
    component: GroupmessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupmessagesPageRoutingModule {}
