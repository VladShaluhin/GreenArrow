import {
  AfterContentInit,
  Component, ContentChild, Directive, ElementRef, OnInit, Optional, Self
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ValidationError } from '../validation-error.service';








@Directive({
  selector: '[gaForm]'
})
export class GaFormDirective implements OnInit {
  private _containers: Set<GaInputContainerComponent> = new Set();

  get form() {
    return this._parentFormGroup || this._parentForm;
  }

  get submitted() {
    return this.form && this.form.submitted;
  }


  register(container: GaInputContainerComponent) {
    this._containers.add(container);
  }

  constructor(
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) {}

  ngOnInit() {
    if (this.form) {
      this.form.ngSubmit
        .map(_ => Array.from(this._containers).find(container => container.invalid))
        .filter(input => !!input)
        .subscribe(input => input._focus())
    }
  }
}

@Directive({
  selector: 'ga-tag-select[gaInput], ga-tag-select-with-drop[gaInput], input[gaInput], textarea[gaInput], select[gaInput]'
})
export class GaInputDirective {
  constructor(
    private _element: ElementRef,
    @Optional() @Self() public _ngControl: NgControl
  ) {}

  _focusHost(): void {
    this._element.nativeElement.focus();
  }
}

@Component({
  selector: 'ga-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  host: {
    '[class.has-error]': '_isErrorState()'
  }
})
export class GaInputContainerComponent implements AfterContentInit {

  @ContentChild(GaInputDirective) _gaInputChild: GaInputDirective;

  get error(): ValidationError|null {
    const control = this._gaInputChild._ngControl;
    for (let errorPropertyName in control.errors) {
      return control.errors[errorPropertyName];
    }
    return null;
  }

  get invalid() {
    const control = this._gaInputChild._ngControl;
    return control && control.invalid;
  }

  constructor(
    @Optional() private _parentForm: GaFormDirective
  ) { }


  ngAfterContentInit() {
    if (this._parentForm) {
      this._parentForm.register(this);
    }
  }

  _focus() {
    if (this._gaInputChild) {
      this._gaInputChild._focusHost();
    }
  }

  _isErrorState() {
    const control = this._gaInputChild._ngControl;
    const isInvalid = control && control.invalid;
    const isTouched = control && control.touched;
    const isSubmitted = this._parentForm.submitted;

    return !!(isInvalid && (isTouched || isSubmitted));
  }
}

