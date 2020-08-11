import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  editTask(newTitle: string): void {
    let oldTitle = '';
    this.route.queryParams.subscribe((params) => {
      oldTitle = params['taskname'];
    });
    this.taskService.editTask(newTitle, oldTitle);
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
