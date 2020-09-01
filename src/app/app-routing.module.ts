import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new/new-list/new-list.component';
import { NewTaskComponent } from './pages/new/new-task/new-task.component';
import { EditListComponent } from './pages/new/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/new/edit-task/edit-task.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './pages/loading/loading.component';

import { AuthGuardService } from './auth-guard.service';
import { ListGuardService } from './list-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'new-list', component: NewListComponent },
  {
    path: 'lists',
    component: TaskViewComponent,
    canActivate: [AuthGuardService, ListGuardService],
  },
  {
    path: 'lists/:listName',
    component: TaskViewComponent,
    children: [
      { path: 'new-task', component: NewTaskComponent },
      { path: 'edit-list', component: EditListComponent },
      { path: 'edit-task', component: EditTaskComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
