import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencesDialogComponent } from './dependences-dialog.component';

describe('DependencesDialogComponent', () => {
  let component: DependencesDialogComponent;
  let fixture: ComponentFixture<DependencesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependencesDialogComponent]
    });
    fixture = TestBed.createComponent(DependencesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
