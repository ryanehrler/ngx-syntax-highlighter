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

| property  |        value         | description                                                                                                         |
| --------- | :------------------: | :------------------------------------------------------------------------------------------------------------------ |
| style     |         null         | No syntax style specified will use default (GITHUB)                                                                 |
|           | SyntaxStyle['STYLE'] | All supported styles listed in enum. Intellisense will ensure you select a valid style.                             |
| .         |          .           | .                                                                                                                   |
| languages |         null         | None specified means you will supply a language later in the component.                                             |
|           |      Language[]      | Array of languages which will be loaded on init.  Can still specify languages later in component.                   |
|           |        'all'         | Will load Highlight.js with all languages. This is the simplest solution but also will generate the largest binary. |
