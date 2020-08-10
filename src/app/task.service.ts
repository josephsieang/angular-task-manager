import { Injectable } from '@angular/core';
import {
  TaskLocalStorageService,
  listsInterface,
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
}
