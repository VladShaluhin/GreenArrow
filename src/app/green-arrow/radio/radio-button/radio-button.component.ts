import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

export class GaRadioSelectionChange {
  constructor(public source: GaRadioButtonComponent, public isUserInput = false) { }
}

@Component({
  selector: 'ga-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  host: {
    '(click)': 'toggle()',
  }
})
export class GaRadioButtonComponent {
  private _selected: boolean = false;

  get selected(): boolean { return this._selected; }

  @Input() value: any;
  @Output() onSelectionChange = new EventEmitter<any>();


  constructor(
    private _element: ElementRef
  ) {}

  get viewValue(): string {
    return this._getHostElement().textContent.trim();
  }

  toggle() {
    this._emitSelectionChangeEvent(true);
  }

  select(): void {
    this._selected = true;
    this._emitSelectionChangeEvent();
  }

  deselect(): void {
    this._selected = false;
    this._emitSelectionChangeEvent();
  }

  /** Fetches the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit(new GaRadioSelectionChange(this, isUserInput));
  }

}
