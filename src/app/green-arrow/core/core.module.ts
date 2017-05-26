import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaCollapseDirective } from '../core/collapse.directive';

export * from './selection';
export * from '../core/collapse.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GaCollapseDirective],
  exports: [GaCollapseDirective]
})
export class GaCoreModule { }
