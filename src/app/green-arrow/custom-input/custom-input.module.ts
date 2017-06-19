import { NgModule } from '@angular/core';
import { GaCustomInputDirective } from './custom-input.directive';
import { GaInputNumberDirective } from './input-number.directive';
import { GaInputLocalNumberDirective } from './input-local-number.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const CUSTOM_INPUTS = [
  GaCustomInputDirective,
  GaInputNumberDirective,
  GaInputLocalNumberDirective,
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
