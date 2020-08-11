import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { listsInterface } from 'src/app/task-local-storage.service';
import {
  faCog,
  faTrashAlt,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';

interface taskInterface {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: listsInterface[];
  tasks: taskInterface[];
  listSettingIcon = faCog;
  taskDeleteIcon = faTrashAlt;
  taskEditIcon = faUserEdit;
  @ViewChildren('taskTitleRef') taskTitleRef: QueryList<any>;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let allTasks = this.taskService.getTasks();
      this.tasks = [];
      for (let { listTitle, tasks } of allTasks) {
        if (listTitle === params['listName']) {
          this.tasks = tasks;
        }
      }
    });

    this.lists = this.taskService.getLists();
  }

  createNewLists(): void {
    this.router.navigate(['/new-list']);
  }

  createNewTasks(): void {
    this.router.navigate([this.router.url, 'new-task']);
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
      deleteTitle = params['listName'];
    });
    this.taskService.deleteList(deleteTitle);
    this.router.navigate(['']);
  }

  deleteWholeList(): void {
    this.taskService.deleteWholeList();
    this.router.navigate(['']);
  }

  deleteTask(title: string): void {
    this.taskService.deleteTask(title);
  }
}
