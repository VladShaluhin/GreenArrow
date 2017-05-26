import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCoreModule, ScrollDispatcher } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaCoreModule } from '../core/core.module';

import { GaTagOptgroupComponent } from './tag-optgroup/tag-optgroup.component';
import { GaTagSelectWithDropComponent, GaTagDropdownComponent} from './tag-select-with-drop/tag-select-with-dropt.component';
import { GaTagSelectComponent } from './tag-select/tag-select.component';
import { GaTagOptionComponent } from './tag-option/tag-option.component';
import { GaTagSelectDirective } from './tag-select.directive';
import { GaTagInputComponent } from './tag-input/tag-input.component';

const TAGS_COMPONETS = [
  GaTagSelectWithDropComponent,
  GaTagSelectComponent,
  GaTagOptionComponent,
  GaTagSelectDirective,
  GaTagOptgroupComponent,
  GaTagSelectDirective,
  // GaTagInputComponent,
  GaTagDropdownComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdCoreModule,
    GaCoreModule
  ],
  declarations: TAGS_COMPONETS,
  exports: TAGS_COMPONETS,
  providers: [
    ScrollDispatcher
  ]
})
export class GaTagsModule { }
