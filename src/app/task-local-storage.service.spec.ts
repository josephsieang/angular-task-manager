import { TestBed } from '@angular/core/testing';

import { TaskLocalStorageService } from './task-local-storage.service';

describe('TaskLocalStorageService', () => {
  let service: TaskLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
