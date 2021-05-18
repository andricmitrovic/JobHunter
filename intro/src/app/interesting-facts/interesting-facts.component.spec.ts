import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestingFactsComponent } from './interesting-facts.component';

describe('InterestingFactsComponent', () => {
  let component: InterestingFactsComponent;
  let fixture: ComponentFixture<InterestingFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestingFactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestingFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
