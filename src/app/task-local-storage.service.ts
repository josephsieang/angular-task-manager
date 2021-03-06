/* tslint:disable:prefer-for-of */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlEncodingService } from './url-encoding.service';
import { Tokens } from './interfaces/tokens';

export interface Lists {
  title: string;
}
export interface Tasks {
  listTitle: string;
  tasks: {
    title: string;
    completed: boolean;
  }[];
}

const storageName = 'joseph_task_manager';
const listPath = '/lists';
const taskPath = '/tasks';
const tokenPath = '/token';

@Injectable({
  providedIn: 'root',
})
export class TaskLocalStorageService {
  private lists: Lists[];
  private tasks: Tasks[];
  private tokens: Tokens;

  constructor(
    private route: Router,
    private urlEncodingService: UrlEncodingService
  ) {
    // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    const lists = localStorage.getItem(storageName + listPath);
    const tasks = localStorage.getItem(storageName + taskPath);

    if (lists !== null) this.lists = JSON.parse(lists);
    else this.lists = [];

    if (tasks !== null) this.tasks = JSON.parse(tasks);
    else this.tasks = [];
  }

  getLists(): Lists[] {
    return this.lists;
  }

  private updateListsInLocalStorage(): Lists[] {
    // Convert a JavaScript object into a string with JSON.stringify()
    localStorage.setItem(storageName + listPath, JSON.stringify(this.lists));
    return this.getLists();
  }

  getTasks(): Tasks[] {
    return this.tasks;
  }

  private updateTasksInLocalStorage(): Tasks[] {
    // Convert a JavaScript object into a string with JSON.stringify()
    localStorage.setItem(storageName + taskPath, JSON.stringify(this.tasks));
    return this.getTasks();
  }

  createLists(title: string): Lists[] {
    this.lists.push({ title });
    return this.updateListsInLocalStorage();
  }

  private getListTitleFromRoute(): string {
    return this.urlEncodingService.ngDecode(this.route.url.split('/')[2]);
  }

  createTasks(title: string): Tasks[] {
    let newListTitle = true;

    for (const { listTitle, tasks } of this.tasks) {
      if (listTitle === this.getListTitleFromRoute()) {
        tasks.push({ title, completed: false });
        newListTitle = false;
      }
    }
    if (newListTitle) {
      this.tasks.push({
        listTitle: this.getListTitleFromRoute(),
        tasks: [{ title, completed: false }],
      });
    }

    return this.updateTasksInLocalStorage();
  }

  editLists(newTitle: string): Lists[] {
    for (let i = 0; i < this.tasks.length; ++i) {
      const { listTitle } = this.tasks[i];
      if (listTitle === this.getListTitleFromRoute()) {
        this.tasks[i][`listTitle`] = newTitle;
        break;
      }
    }

    for (let i = 0; i < this.lists.length; ++i) {
      const { title } = this.lists[i];
      if (title === this.getListTitleFromRoute()) {
        this.lists[i][`title`] = newTitle;
        break;
      }
    }

    this.updateTasksInLocalStorage();
    return this.updateListsInLocalStorage();
  }

  editTasks(
    oldTitle: string,
    newTitle?: string,
    switchIsCompleted?: boolean
  ): void {
    for (let i = 0; i < this.tasks.length; ++i) {
      const { listTitle } = this.tasks[i];
      if (listTitle === this.getListTitleFromRoute()) {
        for (let j = 0; j < this.tasks[i].tasks.length; j++) {
          const { title, completed } = this.tasks[i].tasks[j];
          if (title === oldTitle) {
            if (newTitle) this.tasks[i].tasks[j].title = newTitle;
            if (switchIsCompleted) {
              console.log(this.tasks[i].tasks[j].completed);
              this.tasks[i].tasks[j].completed = !completed;
            }
            break;
          }
        }
        break;
      }
    }

    this.updateTasksInLocalStorage();
  }

  deleteTask(deleteTitle: string): void {
    for (let i = 0; i < this.tasks.length; ++i) {
      const { listTitle } = this.tasks[i];
      if (listTitle === this.getListTitleFromRoute()) {
        for (let j = 0; j < this.tasks[i].tasks.length; j++) {
          const { title } = this.tasks[i].tasks[j];
          if (title === deleteTitle) {
            this.tasks[i].tasks.splice(j, 1);
            break;
          }
        }
        break;
      }
    }

    this.updateTasksInLocalStorage();
  }

  deleteList(deleteTitle: string): void {
    for (let i = 0; i < this.lists.length; ++i) {
      const { title } = this.lists[i];

      if (title === deleteTitle) {
        this.lists.splice(i, 1);
      }
    }

    for (let i = 0; i < this.tasks.length; ++i) {
      const { listTitle } = this.tasks[i];

      if (listTitle === deleteTitle) {
        this.tasks.splice(i, 1);
      }
    }

    this.updateListsInLocalStorage();
    this.updateTasksInLocalStorage();
  }

  deleteWholeList(): void {
    this.lists = [];
    this.tasks = [];

    this.updateListsInLocalStorage();
    this.updateTasksInLocalStorage();
  }

  private updateTokensInLocalStorage(): void {
    // Convert a JavaScript object into a string with JSON.stringify()
    localStorage.setItem(storageName + tokenPath, JSON.stringify(this.tokens));
  }

  saveTokens(tokens: Tokens): void {
    console.log('local storage:', tokens);
    this.tokens = tokens;
    this.updateTokensInLocalStorage();
  }

  getTokens(): Tokens {
    return this.tokens;
  }
}
