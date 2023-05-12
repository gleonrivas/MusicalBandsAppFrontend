import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalPieceComponent } from './musical-piece.component';

describe('MusicalPieceComponent', () => {
  let component: MusicalPieceComponent;
  let fixture: ComponentFixture<MusicalPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicalPieceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicalPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
