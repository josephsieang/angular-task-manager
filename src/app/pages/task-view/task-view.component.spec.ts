import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewComponent } from './task-view.component';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { TaskLocalStorageService } from 'src/app/task-local-storage.service';

describe('TaskViewComponent', () => {
  let component: TaskViewComponent;
  let fixture: ComponentFixture<TaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskViewComponent],
      providers: [TaskService, TaskLocalStorageService, Router],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
