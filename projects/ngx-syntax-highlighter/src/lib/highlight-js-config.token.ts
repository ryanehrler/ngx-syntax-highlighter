import { HighlightJsConfig } from './highlight-js-config';
import { InjectionToken } from '@angular/core';

export const HighlightJsConfigToken = new InjectionToken<HighlightJsConfig>(
  'HighlightJsConfig'
);
