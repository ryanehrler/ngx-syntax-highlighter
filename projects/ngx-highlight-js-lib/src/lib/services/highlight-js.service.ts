import {
  BehaviorSubject,
  empty,
  forkJoin,
  from,
  Observable,
  of,
  Subscription,
  timer,
  zip
  } from 'rxjs';
import {
  combineAll,
  concatMap,
  delay,
  exhaustMap,
  flatMap,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  switchMap,
  tap,
  throttleTime
  } from 'rxjs/operators';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { HighlightJsConfig } from '../highlight-js-config';
import { HighlightJsConfigToken } from '../highlight-js-config.token';
import { Language } from '../language.enum';

@Injectable({
  providedIn: 'root'
})
export class HighlightJsService {
  _initialized = new BehaviorSubject<any>(false);
  // TODO - Make the timeout configurable configurable
  _timeoutError = 60000; // ms
  private _hljsSubject = new BehaviorSubject<any>(null);

  constructor(
    @Inject(HighlightJsConfigToken) private config: HighlightJsConfig
  ) {
    this._init();
  }

  registerLanguage(lang: Language): Promise<boolean> {
    // I converted this method to use observables but the dynamic import + dynamic lang name
    // does not play nice.  Wrapping the import like from(import()) does not work.  Which is
    // a shame because the code is much cleaner :(
    return new Promise((resolveMain, rejectMain) => {
      const l = lang.toLowerCase();
      import(`highlight.js/lib/languages/${l}`).then(javascript => {
        this._executeHljsCommand(hljs => {
          hljs.registerLanguage('javascript', javascript.default);
        }).subscribe(
          result => {
            resolveMain(result);
          },
          err => {
            resolveMain(false);
            console.error(`Error loading highlight.js language: ${l}.`);
            console.error('Error', err);
          }
        );
      });
    });
  }

  highlightBlock(block: ElementRef): Observable<boolean> {
    return this._executeHljsCommand(hljs => {
      hljs.highlightBlock(block.nativeElement);
    });
  }

  private _init() {
    let hljsObs: any;
    if (this._allLanguagesSpecifed(this.config)) {
      hljsObs = this._initHljsWithAllLanguages();
    } else {
      hljsObs = zip(
        this._initHljsWithNoLanguages(),
        this._registerLanguagesFromConfig()
      );
    }

    hljsObs.subscribe(hljs => {
      console.log('hljs-init-complete', hljs);
      this._initialized.next(true);
    });
  }

  private _allLanguagesSpecifed(config: HighlightJsConfig) {
    return config != null && config.languages === 'all';
  }
  private _someLanguagesSpecified(config: HighlightJsConfig) {
    return (
      config != null && config.languages != null && config.languages.length > 0
    );
  }

  private _registerLanguagesFromConfig() {
    if (this.config.languages == null) {
      console.log('no-languages');
      return of({});
    }
    return from(this.config.languages).pipe(
      map(lang => from(this.registerLanguage(Language[lang])))
    );
  }

  private _initHljsWithNoLanguages(): Observable<any> {
    const obs = from(import('highlight.js/lib/highlight'));
    return this._mapHljs(obs);
  }

  private _initHljsWithAllLanguages(): Observable<any> {
    const obs = from(import('highlight.js'));
    return this._mapHljs(obs);
  }

  private _mapHljs(hljsObs: Observable<any>): Observable<any> {
    return hljsObs.pipe(
      // delay(5000),
      tap(hljs => {
        const library = hljs.default;
        library.configure(Object.assign({}));
        this._hljsSubject.next(library);
      })
    );
  }

  private _executeHljsCommand(hljsFn: any): Observable<boolean> {
    // The purpose of this method is to wrap all hljs calls with timeout logic.
    // Since hljs is loaded asynchronously we can only access it through our Subject.
    // So we wrap it in this method so we don't have to duplicate timer code all over
    // the place.

    return new Observable<boolean>(observer => {
      let hljsSub: Subscription;

      const t = timer(this._timeoutError).subscribe(() => {
        hljsSub.unsubscribe();
        observer.error(
          `Failed to load Highlight.js within ${this._timeoutError}ms`
        );
      });

      hljsSub = this._hljsSubject.subscribe(hljs => {
        if (hljs != null) {
          // Execute our hljs command
          hljsFn(hljs);
          if (t != null) {
            t.unsubscribe();
          }
          observer.next(true);
          observer.complete();
        }
      });
    });
  }
}
