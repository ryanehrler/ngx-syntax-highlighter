import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { SyntaxStyle } from '../syntax-style.enum';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly STYLE_NODE_ID = 'highlightJsStyleNode';

  constructor(@Inject(DOCUMENT) private document: any) {}

  async registerStyle(style: SyntaxStyle) {
    return new Promise((resolveMain, rejectMain) => {
      const s = style.toLowerCase();
      import(`highlight.js/styles/${s}`).then(css => {
        this.addStyleToDocument(css.default);
        resolveMain(true);
      });
    });
  }

  private addStyleToDocument(styles: string) {
    const node = this.createStyleElement();
    node.innerHTML = styles;
    this.document.body.appendChild(node);
  }
  private createStyleElement() {
    this.removeStyleNode();
    const styleNode = this.document.createElement('style');
    styleNode.id = this.STYLE_NODE_ID;

    return styleNode;
  }
  removeStyleNode() {
    const node = this.document.getElementById(this.STYLE_NODE_ID);
    if (node != null) {
      console.log('remove-style-node');
      node.parentNode.removeChild(node);
    }
  }
}
