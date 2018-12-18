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
  private _initialized: boolean;
  private _style: SyntaxStyle;
  @Input('style')
  set style(s: SyntaxStyle) {
    this._setStyle(s);
  }
  get style() {
    return this._style;
  }
  @Input() language?: Language;
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
    this.highlightJsService._initialized.subscribe(async serviceInitialized => {
      if (!serviceInitialized) {
        return;
      }

      await this.styleService.registerStyle(this.style);
      console.log(this.language);
      if (this.language != null) {
        console.log(this.language);
        await this.highlightJsService.registerLanguage(this.language);
      }

      this._initialized = true;
      // this.codeElement.nativeElement.innerHTML = this.code;
      // console.log(this.codeElement.nativeElement.innerHTML);
      this._runHighlighter();
    });
  }

  private async _setStyle(style: SyntaxStyle) {
    this._style = style;
    console.log('set-style', style);
    if (this._initialized) {
      await this.styleService.registerStyle(style);
      this._runHighlighter();
    }
  }

  private _runHighlighter() {
    this.highlightJsService.highlightBlock(this.preElement).subscribe(
      result => {
        console.log('run-highlighter-result', result);
      },
      err => {
        console.log('run-highlighter-error', err);
      },
      () => {
        console.log('run-highlighter-complete');
      }
    );
  }
}
