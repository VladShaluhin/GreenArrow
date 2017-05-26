import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GaTagInputComponent } from '../tag-input.component';

@Component({
  selector: 'ga-tag-input-dropdown',
  templateUrl: './tag-input-dropdown.component.html',
  styleUrls: ['./tag-input-dropdown.component.scss']
})
export class GaTagInputDropdownComponent {

  // @Input() public minimumTextLength = 1;
  // @Input() public autocompleteObservable: (text: string) => Observable<any>;
  //
  // constructor(
  //   private _tagInput: GaTagInputComponent
  // ) { }
  //
  // ngOnInit() {
  //   if (this.autocompleteObservable) {
  //     this._tagInput
  //       .onTextChange
  //       .filter((text: string) => text.trim().length >= this.minimumTextLength)
  //       .subscribe((text: string) => this._getItemsFromObservable(text));
  //   }
  // }
  //
  // private _getItemsFromObservable(text) {
  //   this._setLoadingState(true);
  //   this.autocompleteObservable(text)
  //     .subscribe(data => {
  //       // hide loading animation
  //       this._setLoadingState(false)
  //       // add items
  //         .populateItems(data)
  //         // show the dropdown
  //         .show();
  //
  //     }, () => this._setLoadingState(false));
  // }
  //
  // private populateItems(data: any): GaTagInputDropdownComponent {
  //   this.autocompleteItems = data.map(item => {
  //     return typeof item === 'string' ? {
  //       [this.displayBy]: item,
  //       [this.identifyBy]: item
  //     } : item;
  //   });
  //
  //   return this;
  // }
  //
  // private _setLoadingState(state: boolean): GaTagInputDropdownComponent {
  //   this._tagInput.isLoading = state;
  //
  //   return this;
  // }

}
