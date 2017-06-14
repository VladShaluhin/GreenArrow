import { Column } from './column';
import { Row } from './row';
export class DataSet {
  protected data: any[] = [];
  protected columns: Column[] = [];
  protected rows: Row[] = [];

  constructor(
    data: Array<any> = [],
    protected columnSettings: Object
  ) {
    this.createColumns(columnSettings);
    this.setData(data);
  }

  getColumns(): Column[] {
    return this.columns;
  }

  getRows(): Row[] {
    return this.rows;
  }

  createColumns(settings) {
    for (let id in settings) {
      if (settings.hasOwnProperty(id)) {
        this.columns.push(new Column(id, settings[id], this));
      }
    }
  }

  findRowByData(data): Row {
    return this.rows.find((row: Row) => row.getData() === data);
  }

  setData(data: any[]): void {
    this.data = data;
    this.createRows();
  }

  createRows() {
    this.rows = [];

    this.data.forEach((el, index) => {
      this.rows.push(new Row(index, el, this));
    });
  }
}
