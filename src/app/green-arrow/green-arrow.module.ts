import { NgModule } from '@angular/core';
import { GaTagsModule } from './tags/tags.module';
import { GaInputModule } from './input/input.module';
import { GaRadioModule } from './radio/radio.module';
import { GaCardModule } from './card/card.module';
import { GaCoreModule } from './core/core.module';

const GREEN_ARROW_MODULES = [
  GaCoreModule,
  GaTagsModule,
  GaInputModule,
  GaRadioModule,
  GaCardModule
];


export * from './tags/tags.module';
export * from './core/core.module';
export * from './input/input.module';
export * from './radio/radio.module';

@NgModule({
  imports: GREEN_ARROW_MODULES,
  exports: GREEN_ARROW_MODULES,
})
export class GreenArrowModule {}
