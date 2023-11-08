import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRegisterComponent } from './news-register.component';

describe('NewsRegisterComponent', () => {
  let component: NewsRegisterComponent;
  let fixture: ComponentFixture<NewsRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsRegisterComponent]
    });
    fixture = TestBed.createComponent(NewsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
