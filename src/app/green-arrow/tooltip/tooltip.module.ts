import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaTooltipComponent } from './tooltip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GaTooltipComponent],
  exports: [GaTooltipComponent]
})
export class GaTooltipModule { }
