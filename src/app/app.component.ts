import { Component } from '@angular/core';
import { Language, SyntaxStyle } from 'ngx-syntax-highlighter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  styles: string[];
  selectedStyle: string = SyntaxStyle['AN-OLD-HOPE'];
  syntaxStyle = SyntaxStyle;
  languages = Language;
  syntax = {
    language: Language.JAVASCRIPT,
    code: `private whatAmI() {
      console.log('test');
    }`
  };
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
  csharp = `class Program
    {
        static void Main()
        {
            string[] pets = { "dog", "cat", "bird" };

            // ... Loop with the foreach keyword.
            foreach (var value in pets)
            {
                Console.WriteLine(value);
            }
        }
    }
  `;

  bash = `npm install @angular/cli -g`;

  constructor() {
    this.styles = Object.keys(SyntaxStyle);
  }

  changeStyle(event: any) {
    const s = event.target.value;
    console.log('style-change', s);
    this.selectedStyle = SyntaxStyle[s];
  }
}
