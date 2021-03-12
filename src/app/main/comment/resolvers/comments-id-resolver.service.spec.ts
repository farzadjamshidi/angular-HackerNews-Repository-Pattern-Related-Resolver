import { TestBed } from '@angular/core/testing';

import { CommentsIdResolverService } from './comments-id-resolver.service';

describe('CommentsIdsResolverService', () => {
  let service: CommentsIdResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsIdResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
