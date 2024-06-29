import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceStudentComponent } from './space-student.component';

describe('SpaceStudentComponent', () => {
  let component: SpaceStudentComponent;
  let fixture: ComponentFixture<SpaceStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
