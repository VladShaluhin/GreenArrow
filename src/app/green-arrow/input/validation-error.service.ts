import { Injectable, InjectionToken, TemplateRef } from '@angular/core';

export class ValidationError {
  constructor(
    public payload: any,
    public message?: string,
    public tmpl?: TemplateRef<any>
  ) {}
}

export const ERROR_MESSAGE_CONFIG = new InjectionToken<any>('error-message.config');


@Injectable()
export class ValidationErrorService {

  static getValidator(validatorFn, ...args) {
    return (control) => {
      const validationResult = validatorFn(control);
      if (!validationResult) {
        return null;
      }
      console.log(args);
      const key = Object.keys(validationResult).pop();
      const value =  validationResult[key];
      return {[key]: new (<any>ValidationError)(value, ...args)};
    }
  }
}
