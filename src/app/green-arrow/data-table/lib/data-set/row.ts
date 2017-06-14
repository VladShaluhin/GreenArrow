import { DataSet } from './data-set';
import { Column } from './column';
import { Cell } from './cell';
export  class Row {
  protected cells: Cell[] = [];
  protected invalidCell: Cell|null;


  public isInEditing: boolean = false;
  public isValid: boolean = true;

  get length() {
    return this.cells.length;
  }

  constructor(
    public index: number,
    protected data: any,
    protected _dataSet: DataSet
  ) {
    this.process();
  }


  setErrors(errors): void {
    if (errors) {
      for (let key of Object.keys(errors)) {
        const cell = this.cells.find(cell => cell.getColumn().id === key);
        if (cell) {
          cell.setError(errors[key]);
          this.invalidCell = cell;
          break;
        }
      }
    } else if (this.invalidCell) {
      this.invalidCell.setError(null);
      this.invalidCell = null;
    }
  }

  get valid() {
    return !this.invalidCell;
  }

  get invalid() {
    return !!this.invalidCell;
  }


  getData(): any {
    return this.data;
  }

  setData(data): any {
    this.data = data;
    this.process();
  }

  getNewData(): any {
    const values = (<any>Object).assign({}, this.data);
    this.getCells().forEach((cell) => values[cell.getColumn().id] = cell.newValue);
    return values;
  }

  getCells(): Cell[] {
    return this.cells;
  }

  protected createCell(column: Column): Cell {
    const value = typeof this.data[column.id] === 'undefined' ? '' : this.data[column.id];
    return new Cell(value, this, column);
  }

  protected process() {
    this.cells = [];
    this.isValid = true;
    this._dataSet.getColumns()
      .forEach((column: Column) => {
        this.cells.push(this.createCell(column));
      });

    // this.isValid = this.cells.every(cell => cell.valid);
  }
}
