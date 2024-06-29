import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTeacherComponent } from './space-teacher.component';

describe('SpaceTeacherComponent', () => {
  let component: SpaceTeacherComponent;
  let fixture: ComponentFixture<SpaceTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
