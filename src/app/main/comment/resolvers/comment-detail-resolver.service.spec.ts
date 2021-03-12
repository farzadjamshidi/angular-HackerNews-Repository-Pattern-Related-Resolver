import { TestBed } from '@angular/core/testing';

import { CommentsDetailResolverService } from './comments-detail-resolver.service';

describe('CommentDetailResolverService', () => {
  let service: CommentsDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
