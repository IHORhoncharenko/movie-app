/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthUser.serviceService } from './authUser.service.service';

describe('Service: AuthUser.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUser.serviceService]
    });
  });

  it('should ...', inject([AuthUser.serviceService], (service: AuthUser.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
