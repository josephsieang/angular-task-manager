import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new/new-list/new-list.component';
import { NewTaskComponent } from './pages/new/new-task/new-task.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditListComponent } from './pages/new/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/new/edit-task/edit-task.component';
import { FocusDirective } from './focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    EditListComponent,
    EditTaskComponent,
    FocusDirective,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
