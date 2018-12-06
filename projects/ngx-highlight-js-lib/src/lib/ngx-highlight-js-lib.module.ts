import { HighlightSyntaxDirective } from './highlight-syntax.directive';
import { NgModule } from '@angular/core';
import { NgxSyntaxHighlighterComponent } from './ngx-syntax-highlighter/ngx-syntax-highlighter.component';

@NgModule({
  declarations: [HighlightSyntaxDirective, NgxSyntaxHighlighterComponent],
  imports: [],
  exports: [HighlightSyntaxDirective, NgxSyntaxHighlighterComponent]
})
export class NgxHighlightJsModule {}
