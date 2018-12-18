import { DOCUMENT } from '@angular/common';
import { HighlightJsConfig } from '../highlight-js-config';
import { HighlightJsConfigToken } from '../highlight-js-config.token';
import { Inject, Injectable } from '@angular/core';
import { SyntaxStyle } from '../syntax-style.enum';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly STYLE_NODE_ID = 'highlightJsStyleNode';
  private existingStyle: SyntaxStyle;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(HighlightJsConfigToken) private config: HighlightJsConfig
  ) {}

  async registerStyle(style: SyntaxStyle) {
    if (!this.existingStyle || (style && this.existingStyle !== style)) {
      style = style || this.config.style || this._getDefaultStyle();
      this.existingStyle = style;
    } else {
      return Promise.resolve();
    }

    return new Promise((resolveMain, rejectMain) => {
      const s = style.toLowerCase();
      import(`highlight.js/styles/${s}`).then(css => {
        this._addStyleToDocument(css.default);
        resolveMain(true);
      });
    });
  }

  removeStyleNode() {
    const node = this.document.getElementById(this.STYLE_NODE_ID);
    if (node != null) {
      console.log('remove-style-node');
      node.parentNode.removeChild(node);
    }
  }

  private _addStyleToDocument(styles: string) {
    const node = this._createStyleElement();
    node.innerHTML = styles;
    this.document.body.appendChild(node);
  }

  private _createStyleElement() {
    this.removeStyleNode();
    const styleNode = this.document.createElement('style');
    styleNode.id = this.STYLE_NODE_ID;

    return styleNode;
  }

  private _getDefaultStyle() {
    return SyntaxStyle.GITHUB;
  }
}
