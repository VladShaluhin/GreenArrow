import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

export class MdOptionSelectionChange {
  constructor(public source: GaTagOptionComponent, public isUserInput = false) { }
}


@Component({
  selector: 'ga-tag-option',
  templateUrl: './tag-option.component.html',
  styleUrls: ['./tag-option.component.scss'],
  host: {
    '(click)': 'toggle()',
  }
})
export class GaTagOptionComponent {

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
    this.onSelectionChange.emit(new MdOptionSelectionChange(this, isUserInput));
  }
}

