import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

export interface listsInterface {
  title: string;
}

const storageName = 'joseph_task_manager';
const listPath = '/lists';

@Injectable({
  providedIn: 'root',
})
export class TaskLocalStorageService {
  private lists: listsInterface[];

  constructor(private route: Router) {
    // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
    let lists = localStorage.getItem(storageName + listPath);

    if (lists !== null) this.lists = JSON.parse(lists);
    else this.lists = [];
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

  createLists(title: string) {
    this.lists.push({ title: title });
    return this.updateListsInLocalStorage();
  }
}
