import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalComponent } from './rehearsal.component';

describe('RehearsalComponent', () => {
  let component: RehearsalComponent;
  let fixture: ComponentFixture<RehearsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RehearsalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RehearsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
