import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';

const DEFAULT_DIVIDER_REGEXP = /[\n;]+/g;

@Directive({
  selector: 'input[gaParseInput], textarea[gaParseInput]',
  exportAs: 'gaParseInput'
})
export class ParseInputDirective {
  @Input() divider: RegExp = DEFAULT_DIVIDER_REGEXP;
  @Output() parsed = new EventEmitter();
  @Output() clear = new EventEmitter();

  constructor(
    private _elementRef: ElementRef,
    @Self() @Optional() public _control: NgControl,
  ) {}

  public parse() {
    const stringValue = this._elementRef.nativeElement.value;
    const parsedValues = stringValue.split(this.divider)
      .map((value: string) => value.trim())
      .filter((value: string) => !!value);

    this._emitOnParsed(parsedValues)


    return parsedValues;
  }

  private _emitOnParsed(parsedValues):void {
    Observable.from(parsedValues)
      .subscribe({
        next: value => this.parsed.emit(value),
        complete: () => {
          if(this._control) {
            this._control.reset();
          } else {
            this._elementRef.nativeElement.value = '';
          }
          this.clear.emit();
        }
      });
  }

}
