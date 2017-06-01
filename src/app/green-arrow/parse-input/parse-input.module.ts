import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseInputDirective } from './parse-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ParseInputDirective],
  exports: [ParseInputDirective]
})
export class GaParseInputModule { }
