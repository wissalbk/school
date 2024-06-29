import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCourTeacherComponent } from './dashboard-cour-teacher.component';

describe('DashboardCourTeacherComponent', () => {
  let component: DashboardCourTeacherComponent;
  let fixture: ComponentFixture<DashboardCourTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCourTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCourTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
