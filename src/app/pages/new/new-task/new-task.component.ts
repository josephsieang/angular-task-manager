import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  constructor(private taskService: TaskService, private location: Location) {}

  ngOnInit(): void {}

  createNewTask(title: string) {
    this.taskService.createTask(title);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
