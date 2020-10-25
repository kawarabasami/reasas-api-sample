import { TestBed } from '@angular/core/testing';

import { ReasasApiService } from './reasas-api.service';

describe('ReasasApiService', () => {
  let service: ReasasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
