import { TestBed } from '@angular/core/testing';

import { AmiiboiAPIService } from './amiiboi-api.service';

describe('AmiiboiAPIService', () => {
  let service: AmiiboiAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmiiboiAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
