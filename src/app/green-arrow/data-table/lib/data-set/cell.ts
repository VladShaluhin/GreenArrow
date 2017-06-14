import { Row } from './row';
import { Column } from './column';


export class Cell {
  private error: any = null;
  public newValue: any;

  constructor(
    protected value: any,
    protected row: Row,
    protected column
  ) {
    this.newValue = value;
  }

  setError(error) {
    this.error = error;
    if (error) {
      this.newValue = error.value;
    } else {
      this.newValue = this.value;
    }

  }

  get valid() {
    return !this.error;
  }

  get invalid() {
    return !!this.error;
  }


  getValue(): any {
    return this.value || null;
  }

  getRow(): Row {
    return this.row;
  }

  getRowData() {
    return this.row.getData();
  }

  getColumn(): Column {
    return this.column;
  }

}
