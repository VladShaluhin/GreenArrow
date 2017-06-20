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
  tagInputValue = ['test1', 'ololo'];

  tableSource = [
    {name: 'Default dummy job', owner: {userName: 'Test'}, createdTime: '2017-06-19 08:17:30', id:  'id_1'},
    {name: 'Job2', owner: {userName: 'Test'}, createdTime: '2017-06-19 16:14:36', id:  'id_2'},
    {name: 'Job3', owner: {userName: 'Test'}, createdTime: '2017-06-12 04:17:30', id:  'id_3'},
    {name: 'Job4', owner: {userName: 'Test'}, createdTime: '2017-06-19 09:46:30', id:  'id_4'},
  ];



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
  }


  ngAfterViewInit () {
  }
}
