import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { SyntaxStyle } from '../syntax-style.enum';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  constructor() {}

  getStylePath(style: SyntaxStyle, @Inject(DOCUMENT) document: any) {
    return '../assets/highlight.js/' + style;
  }

  async registerStyle(style: SyntaxStyle) {
    return new Promise((resolveMain, rejectMain) => {
      const s = style.toLowerCase();
      import(`highlight.js/styles/${s}`).then(css => {
        console.log('import-style', css);
        resolveMain(true);
      });
    });
  }
}
