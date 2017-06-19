import {
  Component, Input, AfterContentInit, QueryList, ContentChildren, ChangeDetectorRef, NgZone
} from '@angular/core';
import { DataSource } from './lib/data-source/data-source';
import { Grid }from './lib/grid';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { Row } from './lib/data-set/row';
import { ColComponent } from './components/col.component';


@Component({
  selector: 'ga-data-table',
  templateUrl: './data-table.component.html',
  exportAs: 'dataTable'
})
export class DataTableComponent implements AfterContentInit {

  protected defaultSettings: Object = {};

  grid: Grid | null = null;
  @Input() source: any;
  @Input() settings: any;

  @ContentChildren(ColComponent) columns: QueryList<any>;

  constructor(
    protected ref: ChangeDetectorRef,
    protected zone: NgZone
  ) {}

  ngAfterContentInit() {
    this.initGrid();
  }

  onRemove(row: Row) {
    this.grid.remove(row);
  }

  onEdit(row) {
    this.grid.edit(row);
  }

  onSave(row) {
    this.grid.save(row);
  }

  isInLoading(data){
    return this.grid.isInLoading(data);
  }

  protected initGrid(): void {
    this.source = this.prepareSource();
    this.grid = new Grid(this.source, this.prepareSettings());
    this.source.onChanged()
      .debounceTime(100)
      .subscribe(() => {
        this.zone.run(() => this.ref.markForCheck());
      });
  }

  protected prepareSettings(): {columns: any} {
    return (<any>Object)
      .assign({}, this.defaultSettings, this.settings, {columns: this.getColumnSettings()});
  }

  protected getColumnSettings() {
    return this.columns.reduce((acc, col) => {
      return (<any>Object).assign(acc, {[col.id]: col});
    }, {});
  }

  protected prepareSource(): DataSource {
    if (this.source instanceof DataSource) {
      return this.source;
    } else if (this.source instanceof Array) {
      return new LocalDataSource(this.source);
    }

    return new LocalDataSource();
  }
}
