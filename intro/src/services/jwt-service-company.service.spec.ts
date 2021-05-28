import { TestBed } from '@angular/core/testing';

import { JwtServiceCompanyService } from './jwt-service-company.service';

describe('JwtServiceCompanyService', () => {
  let service: JwtServiceCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtServiceCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
