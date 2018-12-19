import { HighlightJsConfig } from './highlight-js-config';
import { HighlightJsConfigToken } from './highlight-js-config.token';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxSyntaxHighlighterComponent } from './ngx-syntax-highlighter/ngx-syntax-highlighter.component';

@NgModule({
  declarations: [NgxSyntaxHighlighterComponent],
  imports: [],
  exports: [NgxSyntaxHighlighterComponent]
})
export class NgxHighlightJsModule {
  static forRoot(config?: HighlightJsConfig): ModuleWithProviders {
    return {
      ngModule: NgxHighlightJsModule,
      providers: [{ provide: HighlightJsConfigToken, useValue: config }]
    };
  }
}
