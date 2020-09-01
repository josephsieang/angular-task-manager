import { TestBed } from '@angular/core/testing';

import { ListGuardService } from './list-guard.service';

describe('ListGuardService', () => {
  let service: ListGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
