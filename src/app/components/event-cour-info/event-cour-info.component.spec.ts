import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourInfoComponent } from './event-cour-info.component';

describe('EventCourInfoComponent', () => {
  let component: EventCourInfoComponent;
  let fixture: ComponentFixture<EventCourInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCourInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
