import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaCoreModule } from '../core/core.module';
import { GaCard, GaCardHeader, GaCardBody, GaCardTitle, GaRemoveButton } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    GaCoreModule
  ],
  declarations: [GaCard, GaCardBody, GaCardHeader, GaCardTitle, GaRemoveButton],
  exports: [GaCard, GaCardBody, GaCardHeader, GaCardTitle, GaRemoveButton]
})
export class GaCardModule { }
