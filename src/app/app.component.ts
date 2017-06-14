import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
const  options = [1, 2, 3, 4, 5, 6, 7];


import { ValidationErrorService } from './green-arrow/green-arrow.module';
import { GaLocalAutocompleteSource } from './green-arrow/tag-input/lib/local.auto-complete-source';





//
//
// const validationMessage = (validatorFn, message: string) => {
//   return (control) => {
//     const validationResult = validatorFn(control);
//     if (!validationResult) {
//       return null;
//     }
//
//     const key = Object.keys(validationResult).pop();
//     const value =  validationResult[key];
//     return {[key]: new ValidationError(value, message)};
//   }
// };

const autocomplete = ['test1', 'test2', 'test3'];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  AfterViewInit{
  form;
  public isCollapsed:boolean = true;

  title = 'app works!';
  options2 = [];



  options = options;
  autocompleteSource = new GaLocalAutocompleteSource(autocomplete)


  get test() {
    console.log(11111)
    return 2;
  }

  constructor(
    private  _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      text: ['', ValidationErrorService.getValidator(Validators.required, 'This field is required! ')],
      select: ['', ValidationErrorService.getValidator(Validators.required, 'This field is required! ')],
      multiselect: [10],
      multiselectWithDrop: [options.slice(0, 2)],
      radioGroup: 'OR',
      parseInput: '',
      tagInput: [['test1']]
    });

    setTimeout(_ => {
      this.options = options.slice(0, -1)
    }, 5000)

  }


  ngAfterViewInit () {
  }
}
