import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusComponentComponent } from './contactus-component.component';

describe('ContactusComponentComponent', () => {
  let component: ContactusComponentComponent;
  let fixture: ComponentFixture<ContactusComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
