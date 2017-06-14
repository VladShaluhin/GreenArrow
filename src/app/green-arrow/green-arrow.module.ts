import { NgModule } from '@angular/core';
import { GaTagsModule } from './tags/tags.module';
import { GaInputModule } from './input/input.module';
import { GaRadioModule } from './radio/radio.module';
import { GaCardModule } from './card/card.module';
import { GaCoreModule } from './core/core.module';
import { GaParseInputModule } from './parse-input/parse-input.module';
import { GaTooltipModule } from './tooltip/tooltip.module';
import { GaCustomInputModule } from './custom-input/custom-input.module';
import { GaDataTableModule } from './data-table/data-table.module';
import { GaTagInputModule } from './tag-input/tag-input.module';

const GREEN_ARROW_MODULES = [
  GaCoreModule,
  GaTagsModule,
  GaTagInputModule,
  GaInputModule,
  GaRadioModule,
  GaCardModule,
  GaParseInputModule,
  GaTooltipModule,
  GaCustomInputModule,
  GaDataTableModule
];

export * from './core/core.module';
export * from './tags/tags.module';
export * from './tag-input/tag-input.module';
export * from './core/core.module';
export * from './input/input.module';
export * from './radio/radio.module';
export * from './tooltip/tooltip.module';
export * from './parse-input/parse-input.module';
export * from './custom-input/custom-input.module';
export * from './data-table/data-table.module';

@NgModule({
  imports: GREEN_ARROW_MODULES,
  exports: GREEN_ARROW_MODULES,
})
export class GreenArrowModule {}
