import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCoreModule, ScrollDispatcher } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaCoreModule } from '../core/core.module';

import { GaTagSelectWithDropComponent} from './tag-select-with-drop/tag-select-with-dropt.component';
import { GaTagSelectComponent } from './tag-select/tag-select.component';
import { GaTagSelectDirective } from './tag-select.directive';
import { GaTagOptgroupComponent } from './tag-optgroup/tag-optgroup.component';

const TAGS_COMPONENTS = [
  GaTagSelectWithDropComponent,
  GaTagSelectComponent,
  GaTagSelectDirective,
  GaTagOptgroupComponent,
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
  declarations: TAGS_COMPONENTS,
  exports: TAGS_COMPONENTS,
  providers: [
    ScrollDispatcher
  ]
})
export class GaTagsModule { }
