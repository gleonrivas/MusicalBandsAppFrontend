import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadCreateComponent } from './squad-create.component';

describe('SquadCreateComponent', () => {
  let component: SquadCreateComponent;
  let fixture: ComponentFixture<SquadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
