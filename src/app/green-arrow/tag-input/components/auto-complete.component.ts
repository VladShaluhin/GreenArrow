import { Component, Input, ViewChild } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { GaAutocompleteSource } from '../lib/auto-complete-source';
import { ScrollDispatcher, ConnectedOverlayDirective } from '@angular/material';

@Component({
  selector: 'ga-tag-input-autocomplete',
  templateUrl: 'auto-complete.component.html'
})
export class GaAutocompleteComponent  {
  private _scrollSubscription: Subscription;

  @Input() source: GaAutocompleteSource;
  @Input() origin: any = null;


  selection$: Subject<any> = new Subject();
  elements: any[] = [];
  panelOpen: boolean = false;
  minWidth: number = 0;

  @ViewChild(ConnectedOverlayDirective) overlayDir: ConnectedOverlayDirective;


  constructor(
    private _scrollDispatcher: ScrollDispatcher,
  ) {}


  close() {
    this.panelOpen = false;
  }

  open (){
    this.panelOpen = true;
  }


  getSuggestion(term: string, selection?: any[]) {
    const search$ = Observable.fromPromise(this.source.search(term, selection));

    search$
      .do(x => console.log(x))
      .filter(elements => elements.length)
      .do(() => this.open())
      .subscribe(elements => {
        this.elements = elements;
      });


    return search$
      .switchMap(() => Observable.merge(this.selection$).do(() => this.close()))

  }

  _onAttached() {
    if (!this._scrollSubscription) {
      this._scrollSubscription = this._scrollDispatcher.scrolled(null, () => {
        const overlayRef = this.overlayDir.overlayRef;
        overlayRef.updatePosition();
      });
    }
  }

  _onDetach() {
    this._scrollSubscription.unsubscribe();
    this._scrollSubscription = null;
  }
}



