import { Language } from './language.enum';
import { SyntaxStyle } from './syntax-style.enum';

export interface HighlightJsConfig {
  languages?: Language[] | string;
  style?: SyntaxStyle;
}
