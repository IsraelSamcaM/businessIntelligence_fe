import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAttComponent } from './form-att.component';

describe('FormAttComponent', () => {
  let component: FormAttComponent;
  let fixture: ComponentFixture<FormAttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAttComponent]
    });
    fixture = TestBed.createComponent(FormAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
