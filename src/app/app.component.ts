import { Component } from '@angular/core';
import { Language } from 'ngx-highlight-js-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  syntax = {
    language: Language.JAVASCRIPT,
    code: 'private whatAmI() {}'
  };
}
