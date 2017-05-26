import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaRadioButtonComponent } from './radio-button/radio-button.component';
import { GaRadioGroupComponent } from './radio-group/radio-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GaRadioButtonComponent, GaRadioGroupComponent],
  exports: [GaRadioButtonComponent, GaRadioGroupComponent]
})
export class GaRadioModule { }
