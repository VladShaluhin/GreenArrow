import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InputContainerComponent, GaInputDirective, GaFormDirective
} from './input-container/input-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorService} from './validation-error.service';


export * from './validation-error.service';
export * from './input-container/input-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [InputContainerComponent, GaInputDirective, GaFormDirective],
  exports: [InputContainerComponent, GaInputDirective, GaFormDirective],
  providers: [
    ValidationErrorService
  ]
})
export class GaInputModule {}
