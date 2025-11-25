import { TestBed } from '@angular/core/testing';

import { HfTextGenerationInference } from './hf-text-generation-inference';

describe('HfTextGenerationInference', () => {
  let service: HfTextGenerationInference;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HfTextGenerationInference);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
