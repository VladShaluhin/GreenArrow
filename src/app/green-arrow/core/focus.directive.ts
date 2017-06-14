import { ElementRef, Input, Directive } from '@angular/core';

@Directive({
  selector: '[gaFocus]'
})

export class GaFocusDirective {
  @Input()
  set focus (focused: any) {
    if (focused) {
      this._elementRef.nativeElement.focus();
    }
  }

  constructor(
    private _elementRef: ElementRef
  ) {}

}
