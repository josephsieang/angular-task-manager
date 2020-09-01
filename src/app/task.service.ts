import { Injectable } from '@angular/core';
import {
  TaskLocalStorageService,
  Lists,
  Tasks,
} from './task-local-storage.service';
import { Tokens } from './interfaces/tokens';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private taskLocalStorageService: TaskLocalStorageService) {}

  createList(title: string): Lists[] {
    return this.taskLocalStorageService.createLists(title);
  }

  getLists(): Lists[] {
    return this.taskLocalStorageService.getLists();
  }

  createTask(title: string): Tasks[] {
    return this.taskLocalStorageService.createTasks(title);
  }

  getTasks(): Tasks[] {
    return this.taskLocalStorageService.getTasks();
  }

  editList(title: string): Lists[] {
    return this.taskLocalStorageService.editLists(title);
  }

  editTask(
    oldTitle: string,
    newTitle?: string,
    switchIsCompleted?: boolean
  ): void {
    this.taskLocalStorageService.editTasks(
      oldTitle,
      newTitle,
      switchIsCompleted
    );
  }

  deleteTask(title: string): void {
    if (confirm('Are you sure to delete this task?'))
      this.taskLocalStorageService.deleteTask(title);
  }

  deleteList(title: string): void {
    if (confirm('Are you sure to delete this list?'))
      this.taskLocalStorageService.deleteList(title);
  }

  deleteWholeList(): void {
    if (confirm('Are you sure to delete the whole list and all its tasks?')) {
      this.taskLocalStorageService.deleteWholeList();
    }
  }

  saveTokens(tokenObj: Tokens): void {
    this.taskLocalStorageService.saveTokens(tokenObj);
  }
}
