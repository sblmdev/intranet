import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraveyardsComponent } from './graveyards.component';

describe('GraveyardsComponent', () => {
  let component: GraveyardsComponent;
  let fixture: ComponentFixture<GraveyardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraveyardsComponent]
    });
    fixture = TestBed.createComponent(GraveyardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
