<a href="https://github.com/ryanehrler/ngx-highlight.js">
  <h1 align="center">ngx-Highlight.js</h1>
<a/>

## Installing

```bash
$ npm install --save ngx-highlight.js
```

## Quickstart

Import **NgxHighlightJsModule** module in app.module or core.module.

```typescript
import { NgxHighlightJsModule } from 'ngx-highlight.js'

(...)

@NgModule({
  (...)
  imports: [
    NgxHighlightJsModule.forRoot()
  ]
  (...)
})
```

Or specify options

```typescript
import {
  HighlightJsConfig,
  Language,
  NgxHighlightJsModule,
  SyntaxStyle
  } from 'ngx-highlight-js-lib';

const highlightJsConfig: HighlightJsConfig = {
  style: SyntaxStyle['AN-OLD-HOPE'],
  languages: [Language.TYPESCRIPT, Language.JAVASCRIPT]
  // languages: 'all'
};

@NgModule({
  (...)
  imports: [
    NgxHighlightJsModule.forRoot(highlightJsConfig)
  ]
  (...)
})
```

**HighlightJsConfig**

| property  |                value | description                                                                                                         |
| --------- | -------------------: | :------------------------------------------------------------------------------------------------------------------ |
| style     |                 null | No syntax style specified will use default (GITHUB)                                                                 |
|           | SyntaxStyle['STYLE'] | All supported styles listed in enum. Intellisense will ensure you select a valid style.                             |
|           |                      |                                                                                                                     |
| languages |                 null | None specified means you will supply a language later in the component.                                             |
|           |           Language[] | Array of languages which will be loaded on init. Can still specify languages later in component.                    |
|           |                'all' | Will load Highlight.js with all languages. This is the simplest solution but also will generate the largest binary. |

#### Config Examples
**Note:** Configuring in the Module import is optional.

```typescript
// Style and Language Configured
const highlightJsConfig: HighlightJsConfig = {
  style: SyntaxStyle['AN-OLD-HOPE'],
  languages: [Language.TYPESCRIPT]
};

// Only configure language
const highlightJsConfig: HighlightJsConfig = {
  languages: [Language.TYPESCRIPT]
};

// Only configure style
const highlightJsConfig: HighlightJsConfig = {
  style: SyntaxStyle['AN-OLD-HOPE'],
};

// Load all languages and style
const highlightJsConfig: HighlightJsConfig = {
  style: SyntaxStyle.GITHUB,
  languages: 'all'
};

// In your App.Module or Core.Module
imports: [
  NgxHighlightJsModule.forRoot(highlightJsConfig)
]
```

### Syntax Highlighter Component
To highlight a block of code use the below component.

In your component.html

```html
<ngx-syntax-highlighter
    [language]="languages.CS"
    [style]="syntaxStyle.VS"
    [code]="csharp"
  ></ngx-syntax-highlighter>
```

OR if you setup the language and style in the module import you can just pass in the code

```html
<ngx-syntax-highlighter [code]="csharp"></ngx-syntax-highlighter>
```

In your component.ts
```typescript

import { Language, SyntaxStyle } from 'ngx-highlight.js';
export class AppComponent {
  syntaxStyle = SyntaxStyle;
  languages = Language;
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
}
```
