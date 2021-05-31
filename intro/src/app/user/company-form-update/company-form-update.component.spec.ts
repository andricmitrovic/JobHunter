import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormUpdateComponent } from './company-form-update.component';

describe('CompanyFormUpdateComponent', () => {
  let component: CompanyFormUpdateComponent;
  let fixture: ComponentFixture<CompanyFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFormUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
