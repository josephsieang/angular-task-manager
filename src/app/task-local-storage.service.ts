import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

export interface listsInterface {
  title: string;
}
export interface tasksInterface {
  listTitle: string;
  tasks: {
    title: string;
    completed: boolean;
  }[];
}

const storageName = 'joseph_task_manager';
const listPath = '/lists';
const taskPath = '/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskLocalStorageService {
  private lists: listsInterface[];
  private tasks: tasksInterface[];

  constructor(private route: Router) {
    // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    let lists = localStorage.getItem(storageName + listPath);
    let tasks = localStorage.getItem(storageName + taskPath);

    if (lists !== null) this.lists = JSON.parse(lists);
    else this.lists = [];

    if (tasks !== null) this.tasks = JSON.parse(tasks);
    else this.tasks = [];
  }

  getLists(): listsInterface[] {
    return this.lists;
  }

  private updateListsInLocalStorage(): listsInterface[] {
    // Convert a JavaScript object into a string with JSON.stringify()
    localStorage.setItem(storageName + listPath, JSON.stringify(this.lists));
    return this.getLists();
  }

  getTasks(): tasksInterface[] {
    return this.tasks;
  }

  private updateTasksInLocalStorage(): tasksInterface[] {
    // Convert a JavaScript object into a string with JSON.stringify()
    localStorage.setItem(storageName + taskPath, JSON.stringify(this.tasks));
    return this.getTasks();
  }

  createLists(title: string) {
    this.lists.push({ title: title });
    return this.updateListsInLocalStorage();
  }

  createTasks(title: string) {
    let listTitleFromRoute = this.route.url.split('/')[2];
    let newListTitle = true;

    for (let { listTitle, tasks } of this.tasks) {
      if (listTitle === listTitleFromRoute) {
        tasks.push({ title: title, completed: false });
        newListTitle = false;
      }
    }
    if (newListTitle) {
      this.tasks.push({
        listTitle: listTitleFromRoute,
        tasks: [{ title: title, completed: false }],
      });
    }

    return this.updateTasksInLocalStorage();
  }
}
