import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new/new-list/new-list.component';
import { NewTaskComponent } from './pages/new/new-task/new-task.component';
import { EditListComponent } from './pages/new/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/new/edit-task/edit-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listName', component: TaskViewComponent },
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
