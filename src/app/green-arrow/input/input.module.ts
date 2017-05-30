import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GaInputContainerComponent, GaInputDirective, GaFormDirective
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
  declarations: [GaInputContainerComponent, GaInputDirective, GaFormDirective],
  exports: [GaInputContainerComponent, GaInputDirective, GaFormDirective],
  providers: [
    ValidationErrorService
  ]
})
export class GaInputModule {}
