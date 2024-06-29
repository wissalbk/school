import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogInfoUserComponent } from './blog-info-user.component';

describe('BlogInfoUserComponent', () => {
  let component: BlogInfoUserComponent;
  let fixture: ComponentFixture<BlogInfoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogInfoUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
