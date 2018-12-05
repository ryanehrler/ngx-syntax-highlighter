import { Injectable } from '@angular/core';
import { SyntaxStyle } from '../syntax-style.enum';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  constructor() {}

  getStylePath(style: SyntaxStyle) {
    return '../assets/highlight.js/' + style;
  }

  async registerStyle(style: SyntaxStyle) {
    return new Promise((resolveMain, rejectMain) => {
      const s = style.toLowerCase();
      import(`highlight.js/styles/${style}`).then(css => {
        console.log('import-style', css);
        resolveMain(true);
      });
    });
  }
}
