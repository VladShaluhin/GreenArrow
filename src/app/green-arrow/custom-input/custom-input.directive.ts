import {
  Directive, HostListener, Input, forwardRef, Renderer, ElementRef, Output,
  OnInit, EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';


const CUSTOM_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputDirective),
  multi: true
};

const SELECTABLE_TYPES = /text|password|search|tel|url/;

@Directive({
  selector: '[customInput]',
  providers: [CUSTOM_INPUT_VALUE_ACCESSOR]
})
export class CustomInputDirective extends DefaultValueAccessor implements ControlValueAccessor, OnInit {
  private _element: any;
  private _render: any;
  private _modelValue: any = null;
  private _internal: boolean = false;
  private _lastValue: any = [];


  @Output() changeValue = new EventEmitter();


  $formatters: any[] = [];
  $parsers: any[] = [];
  $validators: any[] = [];

  @Input('customInput') type: string;

  constructor(
    renderer: Renderer,
    elementRef: ElementRef
  ) {
    super(renderer, elementRef, false);
    this._element = elementRef.nativeElement;
    this._render = renderer;
  }

  ngOnInit() {
    this._render.setElementProperty(this._element, 'type', 'text');
  }

  @HostListener('blur')
  onBlur() {
    this.onTouched();
  }

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: any) {
    const isValid = this.$validators.every((validate: Function) => validate(value));
    if (isValid) {
      this._modelValue = this.$parsers.reduceRight((acc: any, format: Function) => format(acc), value);
      const newValue = this.getValue(this._modelValue);
      if (newValue !== this._lastValue) {
        this.onChange(newValue);
        this.changeValue.emit(newValue);
      }
      this._internal = true;
      this.writeValue(this._modelValue);
      this._internal = false;
    }
  }

  get value(): any {
    return  this._element.value || '';
  }
  get modelValue(): any {
    return this._modelValue;
  }

  writeValue(modelValue: any): void {
    if (!this._internal) {
      this._lastValue = modelValue;
    }

    const currentCaretPosition = this.currentCaretPosition;
    const viewValue = this.$formatters.reduceRight((acc: any, formatter: Function) => {
      return formatter(acc);
    }, (typeof(modelValue) !== 'undefined' ? `${modelValue}` : ''));

    const diff = (viewValue.length - this.value.length);

    super.writeValue(viewValue);
    this.safeSetSelection(currentCaretPosition + diff);
  }

  private getValue(value) {
    switch (this.type) {
      case 'number':
      case 'localNumber':
        let parsedVal = parseFloat(value);

        return !isNaN(parsedVal) ? parsedVal : '';
      default:
        return value;
    }
  }

  private get selectable (){
    const element = this._element;
    return SELECTABLE_TYPES.test(element.type);
  }

  private get currentCaretPosition () {
    if (!this.selectable) {
      return 0;
    }
    const {selectionStart: currentCaretPosition} = this._element;
    return currentCaretPosition;
  }

  private safeSetSelection(selectionPosition) {
    const element = this._element;
    if ((document.activeElement === element) && (this.selectable)) {
      element.setSelectionRange(selectionPosition, selectionPosition, 'none');
    }
  }
}
