import {
  Directive, HostListener, Optional, Host, LOCALE_ID, Inject, Input
} from '@angular/core';
import { CustomInputDirective } from '../custom-input/custom-input.directive';
import { InputNumberDirective } from './input-number.directive';

@Directive({
  selector: 'input[customInput=localNumber]'
})
export class InputLocalNumberDirective extends InputNumberDirective {
  @Input() min;
  constructor(
    @Optional() @Host() _customInput: CustomInputDirective,
    @Inject(LOCALE_ID) private _locale
  ) {
    super(_customInput);
    if (this._customInput) {
      this._customInput.$parsers.push((viewValue: any) => this._parse(viewValue));
      this._customInput.$formatters.push((modelValue: any) => this._format(modelValue));
    }
  }

  @HostListener('keypress', ['$event'])
  onKeypress(event) {
    return super.onKeypress(event);
  }


  private _parse(value: any) {
    const parsedValue = (value ? `${value}` : '')
      .replace(new RegExp('\\' + this.localNumberSeparator, 'g'), '')
      .replace(this.localDotSeparator, '.')
      .replace(new RegExp('\\' + this.localDotSeparator, 'g'), '');

    return parsedValue;
  }

  get localDotSeparator () {
    return new Intl.NumberFormat(this._locale).format(1.1).replace(/1/g, '');
  }

  get localNumberSeparator () {
    return new Intl.NumberFormat(this._locale).format(1111).replace(/1/g, '');
  }

  private _format(value: any) {
    if (!value) {
      return '';
    }
    let formattedValue = this.getLocalNumber(value);
    if (value.slice(-1) === '.') {
      formattedValue = `${formattedValue}${this.localDotSeparator}`;
    }
    return formattedValue;
  }

  private getLocalNumber(val: string) {
    return new Intl.NumberFormat(this._locale).format(+val);
  }
}

