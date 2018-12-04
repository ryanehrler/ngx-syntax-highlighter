import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHighlightJsLibComponent } from './ngx-highlight-js-lib.component';

describe('NgxHighlightJsLibComponent', () => {
  let component: NgxHighlightJsLibComponent;
  let fixture: ComponentFixture<NgxHighlightJsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxHighlightJsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHighlightJsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
