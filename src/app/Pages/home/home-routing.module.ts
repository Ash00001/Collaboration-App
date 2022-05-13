import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'chats',
        loadChildren: ()=> import('../chats/chats.module').then(m=>m.ChatsPageModule)
      },
      {
        path: 'status',
        loadChildren: ()=> import('../status/status.module').then(m=> m.StatusPageModule)
      },
      {
        path: 'create',
        loadChildren: ()=> import('../create/create.module').then(m=> m.CreatePageModule)
      },
      {
        path:'',
        redirectTo:'/home/chats',
        pathMatch:'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}