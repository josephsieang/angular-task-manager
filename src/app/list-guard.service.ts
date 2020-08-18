import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ListGuardService {
  constructor(private taskService: TaskService, private router: Router) {}

  canActivate() {
    const list = this.taskService.getLists();
    if (list.length > 0) {
      this.router.navigate(['/lists', list[0].title]);
      return false;
    }
    return true;
  }
}
