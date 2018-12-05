import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxHighlightJsModule } from 'ngx-highlight-js-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxHighlightJsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
