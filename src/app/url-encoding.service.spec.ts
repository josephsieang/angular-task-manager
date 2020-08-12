import { TestBed } from '@angular/core/testing';

import { UrlEncodingService } from './url-encoding.service';

describe('UrlEncodingService', () => {
  let service: UrlEncodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlEncodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
