import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
  } from '@angular/core';
import { HighlightJsService } from '../services/highlight-js.service';
import { Language } from '../language.enum';
import { StyleService } from '../services/style.service';
import { SyntaxStyle } from '../syntax-style.enum';

@Component({
  selector: 'ngx-syntax-highlighter',
  templateUrl: './ngx-syntax-highlighter.component.html',
  styleUrls: ['./ngx-syntax-highlighter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxSyntaxHighlighterComponent implements OnInit, AfterViewInit {
  @Input() style: SyntaxStyle;
  @Input() language: Language;
  @Input() code: string;

  @ViewChild('codeContainer') codeContainerElement: ElementRef;
  @ViewChild('preElement') preElement: ElementRef;
  @ViewChild('codeElement') codeElement: ElementRef;

  constructor(
    private styleService: StyleService,
    private highlightJsService: HighlightJsService
  ) {}

  ngOnInit() {}
  async ngAfterViewInit() {
    console.log(this.language);
    if (!this.style) {
      this.style = SyntaxStyle['ATOM-ONE-DARK'];
    }
    await this.styleService.registerStyle(this.style);
    await this.highlightJsService.registerLanguage(this.language);

    console.log('fuck off');
    // this.codeElement.nativeElement.innerHTML = this.code;
    console.log(this.codeElement.nativeElement.innerHTML);
    this.highlightJsService.highlightBlock(this.preElement);
  }
}
