import { TestBed } from '@angular/core/testing';

import { UserInfoResolverService } from './user-info-resolver.service';

describe('UserInfoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserInfoResolverService = TestBed.get(UserInfoResolverService);
    expect(service).toBeTruthy();
  });
});
