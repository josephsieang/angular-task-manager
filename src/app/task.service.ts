import { Injectable } from '@angular/core';
import {
  TaskLocalStorageService,
  listsInterface,
  tasksInterface,
} from './task-local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private taskLocalStorageService: TaskLocalStorageService) {}

  createList(title: string): listsInterface[] {
    return this.taskLocalStorageService.createLists(title);
  }

  getLists(): listsInterface[] {
    return this.taskLocalStorageService.getLists();
  }

  createTask(title: string): tasksInterface[] {
    return this.taskLocalStorageService.createTasks(title);
  }

  getTasks(): tasksInterface[] {
    return this.taskLocalStorageService.getTasks();
  }

  editList(title: string): listsInterface[] {
    return this.taskLocalStorageService.editLists(title);
  }

  editTask(newTitle: string, oldTitle: string) {
    this.taskLocalStorageService.editTasks(newTitle, oldTitle);
  }

  deleteTask(title: string) {
    if (confirm('Are you sure to delete this task?'))
      this.taskLocalStorageService.deleteTask(title);
  }

  deleteList(title: string) {
    if (confirm('Are you sure to delete this list?'))
      this.taskLocalStorageService.deleteList(title);
  }

  deleteWholeList() {
    if (confirm('Are you sure to delete the whole list and all its tasks?'))
      this.taskLocalStorageService.deleteWholeList();
  }
}
