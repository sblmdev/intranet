import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurialsComponent } from './burials.component';

describe('BurialsComponent', () => {
  let component: BurialsComponent;
  let fixture: ComponentFixture<BurialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BurialsComponent]
    });
    fixture = TestBed.createComponent(BurialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
