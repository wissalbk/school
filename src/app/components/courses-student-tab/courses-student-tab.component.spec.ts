import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesStudentTabComponent } from './courses-student-tab.component';

describe('CoursesStudentTabComponent', () => {
  let component: CoursesStudentTabComponent;
  let fixture: ComponentFixture<CoursesStudentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesStudentTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesStudentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
