import { TestBed } from '@angular/core/testing';

import { CommentDetailResolverService } from './comment-detail-resolver.service';

describe('CommentDetailResolverService', () => {
  let service: CommentDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
