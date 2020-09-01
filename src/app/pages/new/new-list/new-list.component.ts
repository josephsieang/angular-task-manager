import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  createNewList(title: string): void {
    this.taskService.createList(title);
    this.router.navigate(['/lists', title]);
  }

  cancel(): void {
    this.location.back();
  }
}
