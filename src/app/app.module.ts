import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  HighlightJsConfig,
  Language,
  NgxHighlightJsModule,
  SyntaxStyle
  } from 'ngx-highlight-js-lib';
import { NgModule } from '@angular/core';

const highlightJsConfig: HighlightJsConfig = {
  style: SyntaxStyle['AN-OLD-HOPE'],
  languages: [Language.TYPESCRIPT]
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxHighlightJsModule.forRoot(highlightJsConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
