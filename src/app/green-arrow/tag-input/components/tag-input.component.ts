import {
  Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, Directive, Output, AfterViewInit, ContentChild, Self,
  Optional
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SelectionModel, GaOptionComponent } from '../../core/core.module';
import { GaAutocompleteComponent } from './auto-complete.component';


@Directive({
  selector: '[ga-tag-input-trigger]',
  host: {
    '(paste)': 'onTermChange($event.target.value)',
    '(input)': 'onTermChange($event.target.value)',
    '(focus)' : 'onTermChange($event.target.value)'
  }
})
export class GaTagInputTrigger {
  @Output() termChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private _element: ElementRef
  ) {}

  clean() {
    this._element.nativeElement.value = '';
  }

  onTermChange(event) {
    this.termChange.emit(event)
  }

}


@Component({
  selector: 'ga-tag-input',
  templateUrl: 'tag-input.component.html',
  host: {
    '[class.disabled]': '_disabled'
  }
})
export class GaTagInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  private _tabIndex: number;



  _disabled: boolean = false;
  _onChange = (_: any) => {};
  _onTouched = () => {};
  _selectionModel: SelectionModel<GaOptionComponent>  = new SelectionModel<GaOptionComponent>(true);


  isTriggerFocused: boolean = false;

  @Input()
  get tabIndex(): number { return this._disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) {
    if (typeof value !== 'undefined') {
      this._tabIndex = value;
    }
  }

  @ViewChild(GaTagInputTrigger) trigger: GaTagInputTrigger;
  @ContentChild(GaAutocompleteComponent) autocomplete: GaAutocompleteComponent;

  get selected() {
    return this._selectionModel.selected;
  }

  constructor(
    public elementRef: ElementRef,
    @Self() @Optional() public _control: NgControl,
  ) {
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.trigger) {
      Promise.resolve(null).then(() => {
        this.autocomplete.origin = this;
        this.autocomplete.minWidth = this._getTriggerRect().width;
      });

      this.trigger.termChange
        .filter(term => term.length > 2)
        .switchMap(term => this.autocomplete.getSuggestion(term, this.selected))
        .subscribe(item => {

          if (item) {
            this.trigger.clean();
            this._onSelect(item);
          }
          this.isTriggerFocused = true;
        });
    }

  }

  _onSelect(option){
    const wasSelected = this._selectionModel.isSelected(option);
    this._selectionModel.select(option);
    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(): void {
    const selected =  this.selected.map(option => option);

    this._onChange(selected);
  }


  remove(option) {
    if (!this._disabled) {
      this._selectionModel.deselect(option);
      this._propagateChanges();
    }
  }


  onClick({target}) {
    if (!target.closest('ga-tag-option') ) {
      this.isTriggerFocused = true;
    }
  }

  writeValue(value: any): void {
    this._setSelectionByValue(value);
  }

  _setSelectionByValue(value) {
    if (!value) {
      this._selectionModel.clear();
    } else if (Array.isArray(value)) {
      value.forEach((currentValue: any) => (this._selectionModel.select(currentValue)));
    } else {
      this._selectionModel.select(value)
    }
  }

  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  // private _focusHost(): void {
  //   this.elementRef.nativeElement.focus();
  // }

  private _getTriggerRect(): ClientRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }
}
