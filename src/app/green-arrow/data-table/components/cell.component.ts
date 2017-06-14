import { Component, Input} from '@angular/core';
import { Cell } from '../lib/data-set/cell';
@Component({
  selector: 'ga-table-cell',
  template: `
     <ng-template [ngIf]="customTemplate">
      <div *ngIf="customTemplate"
        [ngTemplateOutlet]="customTemplate" 
        [ngOutletContext]="{
          value: cell.getValue(),
          cell: cell,
          data: cell.getRowData(),
          row: cell.getRow()
        }"
        ></div>
      </ng-template>
      <ng-template [ngIf]="!customTemplate">{{cell.getValue()}}</ng-template>
  `
})
export class CellComponent {
  @Input() isInEditing: boolean = false;
  @Input() cell: Cell;

  constructor() {}

  get customTemplate() {
    const column = this.cell.getColumn();

    if (this.isInEditing && column.editingTemplate) {
      return column.editingTemplate;
    } else if (this.cell.invalid && column.invalidTemplate) {
      return column.invalidTemplate;
    } else {
      return column.defaultTemplate;
    }
  }
}
