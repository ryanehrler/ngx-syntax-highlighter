import {
  Directive,
  ElementRef,
  Inject,
  Input
  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HighlightJsService } from './services/highlight-js.service';
import { Language } from './language.enum';
import { StyleService } from './services/style.service';
import { SyntaxStyle } from './syntax-style.enum';

@Directive({
  selector: '[ngxHighlightSyntax]'
})
export class HighlightSyntaxDirective {
  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: any,
    private styleService: StyleService,
    private highlightJsService: HighlightJsService
  ) {
    console.log('init-highlight-syntax');
  }

  @Input('highlightSyntax')
  set highlightSyntax(opt: { language: Language; code: string }) {
    console.log('highlight-syntax', opt);
    this.initializeHighlighter(opt.language, opt.code);
  }

  private async initializeHighlighter(language: Language, code: string) {
    await this.highlightJsService.registerLanguage(language);
    await this.styleService.registerStyle(SyntaxStyle['AN-OLD-HOPE']);

    const ih = this.elementRef.nativeElement.innerHTML;
    // this.highlightJsService.highlightBlock(code);
  }

  private addStyle(style: SyntaxStyle) {
    if (style == null) {
      style = SyntaxStyle['AN-OLD-HOPE'];
    }
    const head = this.document.head;
    const link = this.document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = this.styleService.getStylePath(SyntaxStyle['AN-OLD-HOPE']);

    head.appendChild(link);
  }
}
