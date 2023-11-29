import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryComponent } from './treasury.component';

describe('TreasuryComponent', () => {
  let component: TreasuryComponent;
  let fixture: ComponentFixture<TreasuryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreasuryComponent]
    });
    fixture = TestBed.createComponent(TreasuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
