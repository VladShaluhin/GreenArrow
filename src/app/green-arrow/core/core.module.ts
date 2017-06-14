import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaCollapseDirective } from '../core/collapse.directive';
import { GaAutosizeDirective } from './autosize.directive';
import { GaOptionComponent} from './option/option.component';
import { GaFocusDirective } from './focus.directive';

export * from './selection';
export * from './collapse.directive';
export * from './autosize.directive';
export * from './option/option.component';
export * from './focus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GaCollapseDirective, GaAutosizeDirective, GaOptionComponent, GaFocusDirective],
  exports: [GaCollapseDirective, GaAutosizeDirective, GaOptionComponent, GaFocusDirective]
})
export class GaCoreModule { }
