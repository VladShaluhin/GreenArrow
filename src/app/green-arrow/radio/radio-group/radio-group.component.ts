import {
  AfterContentInit,
  Attribute, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Optional, Output, QueryList,
  Self
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SelectionModel } from '../../core/selection';
import { Observable } from 'rxjs';
import { GaRadioButtonComponent, GaRadioSelectionChange } from '../radio-button/radio-button.component';

export class GaRadioChange {
  constructor(
    public source: GaRadioGroupComponent,
    public value: any
  ) {}
}

@Component({
  selector: 'ga-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  host: {
    '[class.disabled]': '_disabled'
  }
})
export class GaRadioGroupComponent implements ControlValueAccessor, OnInit, AfterContentInit{
  private _optionSubscription: Subscription;
  private _tabIndex: number;

  _disabled: boolean = false;
  _onChange = (_: any) => {};
  _onTouched = () => {};
  _selectionModel: SelectionModel<any>;

  @ContentChildren(GaRadioButtonComponent, {descendants: true}) options: QueryList<GaRadioButtonComponent>;

  @Output() change: EventEmitter<GaRadioChange> = new EventEmitter<GaRadioChange>();

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
    this._selectionModel = new SelectionModel<GaRadioButtonComponent>(false);
    this._selectionModel.onChange.subscribe((event) => {
      event.added.forEach((opt:GaRadioButtonComponent) => opt.select());
      event.removed.forEach((opt:GaRadioButtonComponent) => opt.deselect());
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

    this.options.forEach(option => (option.disabled = this._disabled));
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
      .filter((event: GaRadioSelectionChange) => event.isUserInput)
      .subscribe((event: GaRadioSelectionChange) => {
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
    const valueToEmit = selected.pop();

    this._onChange(valueToEmit);
    this.change.emit(new GaRadioChange(this, valueToEmit));
  }


  setDisabledState(isDisabled: boolean) {
    console.log(this._disabled)
    this._disabled = isDisabled;
  }

  _getOption(value):  GaRadioButtonComponent|null {
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

  _selectValue(value):  GaRadioButtonComponent|null {
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
