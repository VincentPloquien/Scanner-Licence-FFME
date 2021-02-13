import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceDisplayComponent } from './licence-display.component';

describe('LicenceDisplayComponent', () => {
  let component: LicenceDisplayComponent;
  let fixture: ComponentFixture<LicenceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
