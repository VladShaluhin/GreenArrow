import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaCollapseDirective } from '../core/collapse.directive';
import { GaAutosizeDirective } from './autosize.directive';

export * from './selection';
export * from './collapse.directive';
export * from './autosize.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GaCollapseDirective, GaAutosizeDirective],
  exports: [GaCollapseDirective, GaAutosizeDirective]
})
export class GaCoreModule { }
