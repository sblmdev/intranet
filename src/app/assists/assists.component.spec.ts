import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistsComponent } from './assists.component';

describe('AssistsComponent', () => {
  let component: AssistsComponent;
  let fixture: ComponentFixture<AssistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistsComponent]
    });
    fixture = TestBed.createComponent(AssistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
