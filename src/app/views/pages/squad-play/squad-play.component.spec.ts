import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadPlayComponent } from './squad-play.component';

describe('SquadPlayComponent', () => {
  let component: SquadPlayComponent;
  let fixture: ComponentFixture<SquadPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
