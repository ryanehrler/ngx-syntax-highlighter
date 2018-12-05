import hljs from 'highlight.js/lib/highlight';
import { Injectable } from '@angular/core';
import { Language } from '../language.enum';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class HighlightJsService {
  constructor() {}

  addLanguageScript() {}

  registerLanguage(lang: Language): Promise<boolean> {
    return new Promise((resolveMain, rejectMain) => {
      const l = lang.toLowerCase();
      import(`highlight.js/lib/languages/${l}`).then(javascript => {
        hljs.registerLanguage('javascript', javascript.default);
        resolveMain(true);
      });
    });
  }

  highlightBlock(code: string) {
    return hljs.highlightBlock(code);
  }
}
