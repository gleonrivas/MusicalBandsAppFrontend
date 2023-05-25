import { TestBed } from '@angular/core/testing';

import { RehearsalService } from './rehearsal.service';

describe('RehearsalService', () => {
  let service: RehearsalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RehearsalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
