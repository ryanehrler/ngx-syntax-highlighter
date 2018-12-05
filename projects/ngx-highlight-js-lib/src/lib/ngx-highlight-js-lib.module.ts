import { HighlightSyntaxDirective } from './highlight-syntax.directive';
import { NgModule } from '@angular/core';
import { NgxHighlightJsLibComponent } from './ngx-highlight-js-lib.component';

@NgModule({
  declarations: [NgxHighlightJsLibComponent, HighlightSyntaxDirective],
  imports: [],
  exports: [NgxHighlightJsLibComponent, HighlightSyntaxDirective]
})
export class NgxHighlightJsModule {}
