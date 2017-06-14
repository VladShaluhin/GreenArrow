import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { TitleComponent } from './components/title.component';
import { CellComponent } from './components/cell.component';
import { ColComponent } from './components/col.component';

export { FormArrayDataSource } from './lib/data-source/form-array/form-array.data.source';
export { LocalDataSource } from './lib/data-source/local/local.data-source';
export { ASC, DESC } from './lib/sorting';

export const DATA_TABLE = [
  DataTableComponent,
  TitleComponent,
  CellComponent,
  ColComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: DATA_TABLE,
  exports: DATA_TABLE
})
export class GaDataTableModule { }
