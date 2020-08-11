import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { listsInterface } from 'src/app/task-local-storage.service';

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

  createNewLists() {
    this.router.navigate(['/new-list']);
  }

  createNewTasks() {
    this.router.navigate([this.router.url, 'new-task']);
  }
}
