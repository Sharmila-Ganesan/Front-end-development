import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsComponentComponent } from './forums-component.component';

describe('ForumsComponentComponent', () => {
  let component: ForumsComponentComponent;
  let fixture: ComponentFixture<ForumsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
