import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new/new-list/new-list.component';
import { NewTaskComponent } from './pages/new/new-task/new-task.component';
import { EditListComponent } from './pages/new/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/new/edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loading', component: LoadingComponent },
  {
    path: 'lists',
    component: TaskViewComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'lists/:listName',
    component: TaskViewComponent,
  },
  { path: 'lists/:listName/edit-list', component: EditListComponent },
  { path: 'lists/:listName/edit-task', component: EditTaskComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'lists/:listName/new-task', component: NewTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
