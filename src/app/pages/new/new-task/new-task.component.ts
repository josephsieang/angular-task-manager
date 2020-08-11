import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  createNewTask(title: string) {
    this.taskService.createTask(title);
    this.router.navigate([
      this.router.url.substr(0, this.router.url.lastIndexOf('/')),
    ]);
  }

  cancel() {
    this.router.navigate([
      this.router.url.substr(0, this.router.url.lastIndexOf('/')),
    ]);
  }
}
