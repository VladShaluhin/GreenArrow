import { DataSet } from './data-set';
import { ASC, DESC } from '../sorting';
export class Column {
  public title: string = '';
  public sortDirection: string = '';
  public isSortable: boolean = false;
  public defaultSortDirection: string = '';


  public defaultTemplate: string = '';
  public invalidTemplate: string = '';
  public editingTemplate: string = '';

  protected compareFunction: Function;
  protected validateFunction: Function;

  constructor(
    public id: string,
    protected settings: any,
    protected dataSet: DataSet
  ) {
    this.process();
  }


  process() {
    this.title = this.settings['title'];
    this.sortDirection = this.prepareSortDirection();

    this.compareFunction = this.settings['compareFunction'];
    this.isSortable = typeof this.settings['sort'] === 'undefined' ? true : !!this.settings['sort'];
    this.defaultSortDirection = [ASC, DESC].indexOf(this.settings['sortDirection']) !== -1 ? this.settings['sortDirection'] : '';
    this.validateFunction = this.settings['validateFunction']

    this.defaultTemplate = this.settings['defaultTemplate'];
    this.invalidTemplate = this.settings['invalidTemplate'];
    this.editingTemplate = this.settings['editingTemplate'];
  }

  public getCompareFunction(): Function {
    return this.compareFunction;
  }


  public getValidationFunction(): Function {
    return this.validateFunction;
  }

  protected prepareSortDirection(): string {
    return this.settings['sort'] === DESC ? DESC : ASC;
  }
}
