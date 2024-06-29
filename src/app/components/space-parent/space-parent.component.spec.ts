import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceParentComponent } from './space-parent.component';

describe('SpaceParentComponent', () => {
  let component: SpaceParentComponent;
  let fixture: ComponentFixture<SpaceParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
