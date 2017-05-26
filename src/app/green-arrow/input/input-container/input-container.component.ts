import {
  Component, ContentChild, ContentChildren, Directive, ElementRef, OnInit, Optional, QueryList,
  Self
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ValidationError } from '../validation-error.service';






@Directive({
  selector: 'ga-tag-select[gaInput], ga-tag-select-with-drop[gaInput], input[gaInput], textarea[gaInput], select[gaInput]'
})
export class GaInputDirective {

  get invalid() {
    return this._ngControl ? this._ngControl.invalid : false;
  }

  constructor(
    private _element: ElementRef,
    @Optional() @Self() public _ngControl: NgControl
  ) {}

  _focusHost(): void {
    this._element.nativeElement.focus();
  }
}


@Directive({
  selector: '[gaForm]'
})
export class GaFormDirective implements OnInit {
  @ContentChildren(GaInputDirective, {descendants: true}) _inputs: QueryList<GaInputDirective>;

  get form() {
    return this._parentFormGroup || this._parentForm;
  }

  get submitted() {
    return this.form && this.form.submitted;
  }

  constructor(
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective
  ) {
    console.log(this)
  }

  ngOnInit() {
    if (this.form) {
      this.form.ngSubmit
        .map(_ => this._inputs.toArray().find(input => input.invalid))
        .filter(input => !!input)
        .subscribe(input => input._focusHost())
    }
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
export class InputContainerComponent  {

  @ContentChild(GaInputDirective) _gaInputChild: GaInputDirective;

  get error(): ValidationError|null {
    const control = this._gaInputChild._ngControl;
    for (let errorPropertyName in control.errors) {
      return control.errors[errorPropertyName];
    }
    return null;
  }

  constructor(
    @Optional() private _parentForm: GaFormDirective
  ) {
    console.log(this)
  }

  _isErrorState() {
    const control = this._gaInputChild._ngControl;
    const isInvalid = control && control.invalid;
    const isTouched = control && control.touched;
    const isSubmitted = (this._parentForm && this._parentForm.submitted);

    return !!(isInvalid && (isTouched || isSubmitted));
  }

}
