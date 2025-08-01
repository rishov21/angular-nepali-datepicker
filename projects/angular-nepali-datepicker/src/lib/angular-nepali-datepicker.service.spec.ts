import { TestBed } from '@angular/core/testing';

import { RtcNepaliDatepickerService } from './angular-nepali-datepicker.service';

describe('RtcNepaliDatepickerService', () => {
  let service: RtcNepaliDatepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtcNepaliDatepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
