import { ElementRef, Inject, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HighlightJsConfig } from '../highlight-js-config';
import { HighlightJsConfigToken } from '../highlight-js-config.token';
import { Language } from '../language.enum';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HighlightJsService {
  _initialized: boolean;
  _hljs: any;

  constructor(
    @Inject(HighlightJsConfigToken) private config: HighlightJsConfig
  ) {
    this._initialized = false;
    this._init();
  }

  registerLanguage(lang: Language): Promise<boolean> {
    return new Promise((resolveMain, rejectMain) => {
      const l = lang.toLowerCase();
      import(`highlight.js/lib/languages/${l}`).then(javascript => {
        this._hljs.registerLanguage('javascript', javascript.default);
        resolveMain(true);
      });
    });
  }

  highlightBlock(block: ElementRef) {
    this._hljs.configure(Object.assign({}));
    return this._hljs.highlightBlock(block.nativeElement);
  }

  private _init() {
    let hljsObs: any;
    if (this._allLanguagesSpecifed(this.config)) {
      hljsObs = this._initHljsWithAllLanguages();
    } else {
      hljsObs = this._initHljsWithNoLanguages();
    }

    if (this._someLanguagesSpecified(this.config)) {
      hljsObs.pipe(
        tap(() => {
          for (let index = 0; index < this.config.languages.length; index++) {
            const lang = this.config.languages[index];
            this.registerLanguage(Language[lang]);
          }
        })
      );
    }

    hljsObs.subscribe(() => {
      this._initialized = true;
    });
  }

  private _allLanguagesSpecifed(config: HighlightJsConfig) {
    return config != null && config.languages === 'all';
  }
  private _someLanguagesSpecified(config: HighlightJsConfig) {
    return (
      config != null && config.languages != null && config.languages.length > 0
    );
  }

  private _initHljsWithNoLanguages() {
    return from(import('highlight.js/lib/highlight')).pipe(
      tap(hljs => {
        this._hljs = hljs;
      })
    );
  }

  private _initHljsWithAllLanguages() {
    return from(import('highlight.js')).pipe(
      tap(hljs => {
        this._hljs = hljs;
      })
    );
  }
}
