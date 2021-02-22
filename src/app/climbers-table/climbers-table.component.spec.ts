import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbersTableComponent } from './climbers-table.component';

describe('ClimbersTableComponent', () => {
  let component: ClimbersTableComponent;
  let fixture: ComponentFixture<ClimbersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimbersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimbersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
