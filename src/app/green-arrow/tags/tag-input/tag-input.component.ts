import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ScrollDispatcher, ConnectedOverlayDirective } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { SelectionModel } from '../../core/selection';
import { GaTagOptionComponent } from '../tag-option/tag-option.component';

@Component({
  selector: 'ga-tag-input',
  templateUrl: './tag-input.component.html'
})
export class GaTagInputComponent implements OnInit, ControlValueAccessor {
  private _tabIndex: number;
  search;

  _disabled: boolean = false;

  _onChange = (_: any) => {};
  _onTouched = () => {};
  _selectionModel: SelectionModel<GaTagOptionComponent>;
  @Input() autocomplete;

  constructor() { }

  ngOnInit() {

  }

  onBlur(val) {
    console.log(val)
  }

  writeValue(value: any): void {
    // if (this.options) {
    //   this._setSelectionByValue(value);
    // }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }


}
