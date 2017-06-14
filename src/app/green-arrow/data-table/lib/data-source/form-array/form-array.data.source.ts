import { FormArray, AbstractControl } from '@angular/forms';
import { DataSource } from '../data-source';

export class FormArrayDataSource extends DataSource {
  protected formArray;
  protected sortConf: Array<any> = [];
  constructor(formArray: FormArray) {
    super();
    this.formArray = formArray;
  }

  getSort() {
    return this.sortConf;
  }

  load(values: any[]): Promise<any> {
    this.formArray.reset(values);
    return super.load(values);
  }

  append(control: AbstractControl): Promise<any> {
    this.formArray.push(control);
    return super.append(control.value);
  }

  update(element, values) {
    const newValuePromise = (<any>Promise.all)([this.findControl(element), values])
      .then(([control, data]) => {
        control.patchValue(data);
        return control.valid ? control.value : Promise.reject(control.errors);
      });

    return super.update(element, newValuePromise);
  }

  protected findControl(element): Promise<any> {
    const found = this.formArray.controls.find(control => control.value === element);
    if (found) {
      return Promise.resolve(found);
    }

    return Promise.reject(new Error('Control was not found in the FormArray'));
  }

  remove(element: any) {
    return this.findControl(element)
      .then((control: AbstractControl) => {
        const index = this.formArray.controls.indexOf(control);
        this.formArray.removeAt(index);
        return super.remove(element);
      });
  }

  getElements() {
    return Promise.resolve([...this.formArray.value]);
  }

}
