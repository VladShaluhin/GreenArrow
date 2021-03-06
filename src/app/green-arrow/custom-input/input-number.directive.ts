import {
  Directive, HostListener, Optional, Host, Input
} from '@angular/core';
import { GaCustomInputDirective } from '../custom-input/custom-input.directive';



@Directive({
  selector: 'input[GaCustomInput=number]'
})
export class GaInputNumberDirective {
  dotLast: boolean = false;
  @Input() min: number = Number.NEGATIVE_INFINITY;
  constructor(
    @Optional() @Host() protected _customInput: GaCustomInputDirective
  ) {}


  @HostListener('keypress', ['$event'])
  onKeypress(event) {
    const charCode = event.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (/[^\d,\.\-]/.test(charStr)) {
      return false;
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event) {
    if (this._customInput.modelValue < this.min) {
      this._customInput.onInputChange(`${this.min}`);
    }
  }
}

