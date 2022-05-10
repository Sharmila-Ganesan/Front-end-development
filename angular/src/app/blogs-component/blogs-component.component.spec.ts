import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsComponentComponent } from './blogs-component.component';

describe('BlogsComponentComponent', () => {
  let component: BlogsComponentComponent;
  let fixture: ComponentFixture<BlogsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
