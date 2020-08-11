import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  editList(title: string): void {
    this.taskService.editList(title);
    this.router.navigate(['lists', title]);
  }

  cancel() {
    this.router.navigate([
      this.router.url.substr(0, this.router.url.lastIndexOf('/')),
    ]);
  }
}
