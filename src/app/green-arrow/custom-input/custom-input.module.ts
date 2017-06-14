import { NgModule } from '@angular/core';
import { CustomInputDirective } from './custom-input.directive';
import { InputNumberDirective } from './input-number.directive';
import { InputLocalNumberDirective } from './input-local-number.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const CUSTOM_INPUTS = [
  CustomInputDirective,
  InputNumberDirective,
  InputLocalNumberDirective,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: CUSTOM_INPUTS,
  exports: CUSTOM_INPUTS
})
export class GaCustomInputModule {}
