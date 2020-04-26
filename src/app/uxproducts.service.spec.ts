import { TestBed } from '@angular/core/testing';

import { UxproductsService } from './uxproducts.service';

describe('UxproductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UxproductsService = TestBed.get(UxproductsService);
    expect(service).toBeTruthy();
  });
});
