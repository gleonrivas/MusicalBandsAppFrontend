import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAuthPageComponent } from './no-auth-page.component';

describe('NoAuthPageComponent', () => {
  let component: NoAuthPageComponent;
  let fixture: ComponentFixture<NoAuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAuthPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
