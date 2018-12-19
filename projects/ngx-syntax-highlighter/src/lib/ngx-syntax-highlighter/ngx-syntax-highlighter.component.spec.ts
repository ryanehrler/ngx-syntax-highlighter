import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSyntaxHighlighterComponent } from './ngx-syntax-highlighter.component';

describe('NgxSyntaxHighlighterComponent', () => {
  let component: NgxSyntaxHighlighterComponent;
  let fixture: ComponentFixture<NgxSyntaxHighlighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSyntaxHighlighterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSyntaxHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
