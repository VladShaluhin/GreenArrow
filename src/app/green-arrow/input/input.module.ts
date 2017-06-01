import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaInputContainer, GaInput, GaForm } from './input-container';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorService} from './validation-error.service';


export * from './validation-error.service';
export * from './input-container';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [GaInputContainer, GaInput, GaForm],
  exports: [GaInputContainer, GaInput, GaForm],
  providers: [
    ValidationErrorService
  ]
})
export class GaInputModule {}
