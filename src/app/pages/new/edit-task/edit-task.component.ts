import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  oldTitle: string = '';
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.oldTitle = params['taskname'];
    });
  }

  editTask(newTitle: string): void {
    this.taskService.editTask(this.oldTitle, newTitle);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
