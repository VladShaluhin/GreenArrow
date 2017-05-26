import {
  Directive, OnInit, ContentChildren, QueryList, AfterContentInit, Self, Optional, Input, Output, EventEmitter,
  ElementRef, Attribute,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SelectionModel } from '../core/core.module';
import { GaTagOptionComponent } from './tag-option/tag-option.component';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

export class SelectChange {
  constructor(public source: GaTagSelectDirective, public value: any) { }
}

@Directive({
  selector: '[gaTagSelect], ga-tag-select, ga-tag-select-with-drop',
  exportAs: 'tagSelect',
  host: {
    '[attr.tabindex]': 'tabIndex',
    '(click)': '_focusHost()'
  }
})
export class GaTagSelectDirective  implements AfterContentInit, ControlValueAccessor, OnInit {

  private _optionSubscription: Subscription;
  private _tabIndex: number;


  _disabled: boolean = false;

  _onChange = (_: any) => {};
  _onTouched = () => {};
  _selectionModel: SelectionModel<GaTagOptionComponent>;

  @ContentChildren(GaTagOptionComponent, {descendants: true}) options: QueryList<GaTagOptionComponent>;

  @Input() multiple: boolean = false;
  @Output() change: EventEmitter<SelectChange> = new EventEmitter<SelectChange>();

  @Input()
  get tabIndex(): number { return this._disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) {
    if (typeof value !== 'undefined') {
      this._tabIndex = value;
    }
  }

  get selected() {
    return this._selectionModel.selected;
  }

  constructor(
    private _element: ElementRef,
    @Self() @Optional() public _control: NgControl,
    @Attribute('tabindex') tabIndex: string
  ) {
    if (this._control) {
      this._control.valueAccessor = this;
    }

    this._tabIndex = parseInt(tabIndex) || 0;
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel<GaTagOptionComponent>(this.multiple);
    this._selectionModel.onChange.subscribe((event) => {
      event.added.forEach((opt:GaTagOptionComponent) => opt.select());
      event.removed.forEach((opt:GaTagOptionComponent) => opt.deselect());
    });
  }


  ngAfterContentInit() {
    this.options.changes.startWith(null).subscribe(_ => {
      this._resetOptions();
      if (this._control) {
        Promise.resolve(null).then(() => this._setSelectionByValue(this._control.value));
      }
    });
  }

  private _resetOptions(): void {
    this._dropSubscriptions();
    this._listenToOptions();
  }

  _dropSubscriptions() {
    if(this._optionSubscription) {
      this._optionSubscription.unsubscribe();
      this._optionSubscription = null;
    }
  }

  _listenToOptions() {
    const optionSelectionChanges = Observable.merge(...this.options.map(option => option.onSelectionChange));
    this._optionSubscription = optionSelectionChanges
      .filter((event: any) => event.isUserInput)
      .subscribe(event => {
        this._onSelect(event.source);
      });
  }


  _onSelect(option){
    const wasSelected = this._selectionModel.isSelected(option);
    this._selectionModel.toggle(option);
    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(): void {
    const selected =  this.selected.map(option => option.value);
    const valueToEmit = this.multiple ? (selected.length ? selected : null) : selected.pop();

    this._onChange(valueToEmit);
    this.change.emit(new SelectChange(this, valueToEmit));
  }


  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  _getOption(value):  GaTagOptionComponent|null {
    const optionsArray = this.options.toArray();
    return optionsArray.find(option => option.value === value) || null;
  }

  _setSelectionByValue(value) {
    this._selectionModel.clear();
    if (Array.isArray(value)) {
      value.forEach((currentValue: any) => this._selectValue(currentValue));
    } else {
      this._selectValue(value);
    }
  }

  _selectValue(value):  GaTagOptionComponent|null {
    let correspondingOption = this._getOption(value);
    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }
    return correspondingOption;
  }

  writeValue(value: any): void {
    if (this.options) {
      this._setSelectionByValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  private _focusHost(): void {
    this._element.nativeElement.focus();
  }

}
