import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorateMembersComponent } from './directorate-members.component';

describe('DirectorateMembersComponent', () => {
  let component: DirectorateMembersComponent;
  let fixture: ComponentFixture<DirectorateMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorateMembersComponent]
    });
    fixture = TestBed.createComponent(DirectorateMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
