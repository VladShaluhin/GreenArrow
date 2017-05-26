import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaCoreModule } from '../core/core.module';
import { GaCardComponent } from './card/card.component';
import { GaCardBodyComponent } from './card-body/card-body.component';
import { GaCardHeaderComponent } from './card-header/card-header.component';

@NgModule({
  imports: [
    CommonModule,
    GaCoreModule
  ],
  declarations: [GaCardComponent, GaCardBodyComponent, GaCardHeaderComponent],
  exports: [GaCardComponent, GaCardBodyComponent, GaCardHeaderComponent]
})
export class GaCardModule { }
