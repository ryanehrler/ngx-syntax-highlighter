import { TestBed } from '@angular/core/testing';

import { NgxHighlightJsLibService } from './ngx-highlight-js-lib.service';

describe('NgxHighlightJsLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxHighlightJsLibService = TestBed.get(NgxHighlightJsLibService);
    expect(service).toBeTruthy();
  });
});
