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

  createLists(title: string): listsInterface[] {
    this.lists.push({ title: title });
    return this.updateListsInLocalStorage();
  }

  private getListTitleFromRoute() {
    return this.route.url.split('/')[2];
  }

  createTasks(title: string): tasksInterface[] {
    let newListTitle = true;

    for (let { listTitle, tasks } of this.tasks) {
      if (listTitle === this.getListTitleFromRoute()) {
        tasks.push({ title: title, completed: false });
        newListTitle = false;
      }
    }
    if (newListTitle) {
      this.tasks.push({
        listTitle: this.getListTitleFromRoute(),
        tasks: [{ title: title, completed: false }],
      });
    }

    return this.updateTasksInLocalStorage();
  }

  editLists(newTitle: string): listsInterface[] {
    for (let i = 0; i < this.tasks.length; ++i) {
      const { listTitle } = this.tasks[i];
      if (listTitle === this.getListTitleFromRoute()) {
        this.tasks[i]['listTitle'] = newTitle;
        break;
      }
    }

    for (let i = 0; i < this.lists.length; ++i) {
      const { title } = this.lists[i];
      if (title === this.getListTitleFromRoute()) {
        this.lists[i]['title'] = newTitle;
        break;
      }
    }

    this.updateTasksInLocalStorage();
    return this.updateListsInLocalStorage();
  }

  editTasks(newTitle: string, oldTitle: string) {
    for (let i = 0; i < this.tasks.length; ++i) {
      const { listTitle } = this.tasks[i];
      if (listTitle === this.getListTitleFromRoute()) {
        for (let j = 0; j < this.tasks[i].tasks.length; j++) {
          const { title, completed } = this.tasks[i].tasks[j];
          if (title === oldTitle) {
            this.tasks[i].tasks[j].title = newTitle;
            break;
          }
        }
        break;
      }
    }

    this.updateTasksInLocalStorage();
  }

  deleteTask(deleteTitle: string) {
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

  deleteList(deleteTitle: string) {
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

  deleteWholeList() {
    this.lists = [];
    this.tasks = [];

    this.updateListsInLocalStorage();
    this.updateTasksInLocalStorage();
  }
}
