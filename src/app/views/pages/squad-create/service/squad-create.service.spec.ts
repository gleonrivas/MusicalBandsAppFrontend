import { TestBed } from '@angular/core/testing';

import { SquadCreateService } from './squad-create.service';

describe('SquadCreateService', () => {
  let service: SquadCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
