import { TestBed } from '@angular/core/testing';

import { SseStreamService } from './sse-stream.service';

describe('SseStreamService', () => {
  let service: SseStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SseStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
