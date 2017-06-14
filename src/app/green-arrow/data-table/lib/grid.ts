import { DataSource, STATUSES } from './data-source/data-source';
import { DataSet } from './data-set/data-set';
import { Column } from './data-set/column';
import { Row } from './data-set/row';
import { Observable } from 'rxjs';
export class Grid {
  protected source: DataSource;
  protected settings: any;
  protected dataSet: DataSet;
  protected pendingMap = new Map();


  constructor(source: DataSource, settings: {columns: any[]}) {
    this.setSettings(settings);
    this.setSource(source);
  }

  getColumns(): Array<Column> {
    return this.dataSet.getColumns();
  }

  getRows() {
    return this.dataSet.getRows();
  }

  getSettings(name: string) {
    return this.settings[name];
  }

  setSettings(settings: {columns: any[]}): void {
    this.settings = settings;
    this.dataSet = new DataSet([], settings.columns);

    if (this.source) {
      this.source.refresh();
    }
  }

  edit(row: Row): void {
    row.isInEditing = true;
  }

  remove(row: Row): void {
    (<any>this.source.remove)(row.getData());
  }

  save(row: Row) {
    this.source.update(row.getData(), row.getNewData())
      .then(() => {
        row.isInEditing = false;
      });
  }

  setSource(source: DataSource): void {
    this.source = this.prepareSource(source);

    this.source.onChanged()
      .filter(({action}) => this.shouldProcessChange(action))
      .subscribe(({elements}) => this.processDataChange(elements));

    this.source.onUpdated()
      .subscribe(data => this.pendingMap.delete(data))

    this.source.onUpdateError()
      .do(({element}) => this.pendingMap.delete(element))
      .subscribe(({element, errors}) => {
        const row = this.dataSet.findRowByData(element);
        row.setErrors(errors)
      });

    this.source.onUpdateStart()
      .do((data) => {
        const row = this.dataSet.findRowByData(data);
        row.setErrors(null);
      })
      .subscribe((data) => {
        this.pendingMap.set(data, true);
      });

  }

  isInLoading(data) {
    return this.pendingMap.has(data);
  }


  protected processDataChange(elements): void {
    this.dataSet.setData(elements);
  }

  protected shouldProcessChange(action): boolean {
    return (['sort', 'refresh', 'load', 'remove',  'filter', 'append', 'update'].indexOf(action) >= 0);
  }

  protected prepareSource(source): DataSource {
    const initialSort = this.getInitialSort();
    if (initialSort && initialSort['field'] && initialSort['direction']) {
      source.setSort([initialSort], false);
    }
    source.refresh();
    return source;
  }

  protected getInitialSort() {
    let sortConf = {};
    this.getColumns().forEach((column: Column) => {
      if (column.isSortable && column.defaultSortDirection) {
        sortConf['field'] = column.id;
        sortConf['direction'] = column.defaultSortDirection;
        sortConf['compare'] = column.getCompareFunction();
      }
    });
    return sortConf;
  }
}
