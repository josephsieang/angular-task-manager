import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Lists } from 'src/app/task-local-storage.service';
import {
  faCog,
  faTrashAlt,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication.service';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit, DoCheck {
  lists: Lists[];
  tasks: Task[];
  listSettingIcon = faCog;
  taskDeleteIcon = faTrashAlt;
  taskEditIcon = faUserEdit;
  disabled = true;
  prevListLength: number;
  prevTaskLength: number;

  constructor(
    private taskService: TaskService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListsAndTasks();
  }

  ngDoCheck(): void {
    const curListLength = this.taskService.getLists().length;
    const curTaskLength = this.taskService.getTasks().length;
    if (
      curListLength !== this.prevListLength ||
      curTaskLength !== this.prevTaskLength
    ) {
      this.getListsAndTasks();
    }
  }

  getListsAndTasks(): void {
    this.route.params.subscribe((params: Params) => {
      const allTasks = this.taskService.getTasks();
      this.prevTaskLength = allTasks.length;
      if (allTasks.length > 0) {
        this.tasks = [];
        for (const { listTitle, tasks } of allTasks) {
          if (listTitle === params[`listName`]) {
            this.tasks = tasks;
          }
        }
      }
    });

    this.lists = this.taskService.getLists();
    this.prevListLength = this.lists.length;
    if (this.prevListLength > 0) {
      this.disabled = false;
    }
  }

  createNewLists(): void {
    this.router.navigate(['/new-list']);
  }

  createNewTasks(): void {
    // Fix double space url encoding
    this.router.navigate(['new-task'], { relativeTo: this.route });
  }

  editList(): void {
    // this.router.navigate([this.router.url, 'edit-list']);
    this.router.navigate(['edit-list'], { relativeTo: this.route });
  }

  editTask(title: string): void {
    this.router.navigate(['edit-task'], {
      relativeTo: this.route,
      queryParams: { taskname: title },
    });
  }

  deleteList(): void {
    let deleteTitle = '';
    this.route.params.subscribe((params: Params) => {
      deleteTitle = params[`listName`];
    });
    this.taskService.deleteList(deleteTitle);
    this.router.navigate(['/lists']);
  }

  deleteWholeList(): void {
    this.taskService.deleteWholeList();
    this.router.navigate(['/lists']);
  }

  deleteTask(title: string): void {
    this.taskService.deleteTask(title);
  }

  taskCompletion(title: string): void {
    this.taskService.editTask(title, null, true);
  }

  signOut(): void {
    this.authenticationService.logout();
  }

  obtainChildLength(): number {
    return this.route.children.length;
  }
}
