import { Component, Input, OnInit } from '@angular/core';
import { DataSource } from '../lib/data-source/data-source';
import { Column } from '../lib/data-set/column';
import { ASC, DESC, DEFAULT_SORT } from '../lib/sorting';


const SORT_CLASSES = {
  ASC: 'caret to-top current-sorting',
  DESC: 'caret current-sorting',
  DEFAULT_SORT: ''
}

@Component({
  selector: 'ga-table-title',
  template: `
     <a *ngIf="column.isSortable" (click)="sort()">{{ column.title }} <span [ngClass]="getSortClass()"></span></a>
     <span *ngIf="!column.isSortable">{{ column.title }}</span>
  `
})
export class TitleComponent implements OnInit {
  @Input() column: Column;
  @Input() source: DataSource;

  protected currentDirection = '';

  getSortClass() {
    return SORT_CLASSES[this.currentDirection];
  }

  ngOnInit() {
    this.source.onChanged().subscribe(() => {
      let sortConf = this.source.getSort();

      if (sortConf.length > 0 && sortConf[0]['field'] === this.column.id) {
        this.currentDirection = sortConf[0]['direction'];
      } else {
        this.currentDirection = '';
      }
    });
  }
  sort(): boolean {
    this.changeSortDirection();
    this.source.setSort([
      {
        field: this.column.id,
        direction: this.currentDirection,
        compare: this.column.getCompareFunction()
      }
    ]);
    return false;
  }

  changeSortDirection(): string {
    if (this.currentDirection) {
      let newDirection = this.currentDirection === ASC ? DESC : ASC;
      this.currentDirection = newDirection;
    } else {
      this.currentDirection = this.column.sortDirection;
    }
    return this.currentDirection;
  }
}
