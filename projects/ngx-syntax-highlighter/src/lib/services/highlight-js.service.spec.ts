import { TestBed } from '@angular/core/testing';

import { HighlightJsService } from './highlight-js.service';

describe('HighlightJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HighlightJsService = TestBed.get(HighlightJsService);
    expect(service).toBeTruthy();
  });
});
