import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCoreModule, ScrollDispatcher } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaCoreModule } from '../core/core.module';

import { GaTagInputComponent, GaTagInputTrigger } from './components/tag-input.component';
import { GaAutocompleteComponent } from './components/auto-complete.component';

const TAGS_COMPONENTS = [
  GaTagInputComponent,
  GaTagInputTrigger,
  GaAutocompleteComponent
];

export * from './lib/auto-complete-source';
export * from './lib/local.auto-complete-source';
export * from './components/auto-complete.component';

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
export class GaTagInputModule { }
