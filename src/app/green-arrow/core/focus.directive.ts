import { ElementRef, Input, Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[gaFocus]',
  host: {
    '(blur)': 'onBlur()'
  }
})

export class GaFocusDirective {
  @Input()
  set gaFocus (focused: boolean) {
    if (focused) {
      this._elementRef.nativeElement.focus();
    }
  }

  @Output() gaFocusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _elementRef: ElementRef
  ) {}

  onBlur() {
    this.gaFocusChange.emit(false);
  }

}
