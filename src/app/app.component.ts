import { Component } from '@angular/core';
import { Language, SyntaxStyle } from 'ngx-highlight-js-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  styles: string[];
  selectedStyle: string;
  syntax = {
    language: Language.JAVASCRIPT,
    code: `private whatAmI() {
      console.log('test');
    }`
  };
  languages = Language;
  typescript = `class MyClass {
      public static myValue: string;
      constructor(init: string) {
        this.myValue = init;
      }
    }
    import fs = require("fs");
    module MyModule {
      export interface MyInterface extends Other {
        myProperty: any;
      }
    }
    declare magicNumber number;
    myArray.forEach(() => { }); // fat arrow syntax
    `;

  constructor() {
    this.styles = Object.keys(SyntaxStyle);
  }

  changeStyle(event: any) {
    const s = event.target.value;
    console.log('style-change', s);
    this.selectedStyle = SyntaxStyle[s];
  }
}
