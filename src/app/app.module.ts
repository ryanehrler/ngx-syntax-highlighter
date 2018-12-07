import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxHighlightJsModule } from 'ngx-highlight-js-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgxHighlightJsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
