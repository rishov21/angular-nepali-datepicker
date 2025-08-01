import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcNepaliDatepickerComponent } from './angular-nepali-datepicker.component';

describe('RtcNepaliDatepickerComponent', () => {
  let component: RtcNepaliDatepickerComponent;
  let fixture: ComponentFixture<RtcNepaliDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtcNepaliDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtcNepaliDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
