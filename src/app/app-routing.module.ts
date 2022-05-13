import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './GUARDS/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./PAGES/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./PAGES/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'groupmessages',
    loadChildren: () => import('./PAGES/groupmessages/groupmessages.module').then( m => m.GroupmessagesPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./PAGES/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./PAGES/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./PAGES/create/create.module').then( m => m.CreatePageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}