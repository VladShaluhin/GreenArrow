import { DataSource } from '../data-source';
import { LocalSorter } from './local.sorter';
import { LocalFilter } from './local.filter';

export class LocalDataSource extends DataSource {
  protected data: Array<any> = [];
  protected sortConf: Array<any> = [];
  protected filterConf = {
    filters: [],
    andOperator: true
  };

  constructor(data: Array<any> = []) {
    super();
    this.data = data;
  }

  load(data: Array<any>): Promise<any> {
    this.data = data;
    return super.load(data);
  }

  append(element: any): Promise<any> {
    this.data.push(element);
    return super.append(element);
  }


  update(element: any, values?: any|Promise<any>): Promise<any> {
    const newValuePromise = (<any>Promise.all)([this.find(element), values])
      .then(([found, data]) => {
        return (<any>Object).assign(found, data);
      });

    return super.update(element, newValuePromise);

  }

  find(element: any): Promise<any> {
    const found = this.data.filter(el => el === element)[0];
    if (found) {
      return Promise.resolve(found);
    }

    return Promise.reject(new Error('Element was not found in the dataset'));
  }

  remove(element: any): Promise<any> {
    this.data = this.data.filter(el => el !== element);
    return super.remove(element);
  }

  setSort(conf: Array<any>, doEmit = true): LocalDataSource {
    if (conf !== null) {
      conf.forEach((fieldConf) => {
        if (!fieldConf['field'] || typeof fieldConf['direction']  === 'undefined') {
          throw new Error('Sort configuration object is not valid');
        }
      });
      this.sortConf = conf;
    }

    super.setSort(conf, doEmit);
    return this;
  }

  addFilter(fieldConf, andOperator = true, doEmit: boolean = true): LocalDataSource {
    if (!fieldConf['field'] || typeof fieldConf['search'] === 'undefined') {
      throw new Error('Filter configuration object is not valid');
    }

    let found = false;
    this.filterConf.filters.forEach((currentFieldConf, index) => {
      if (currentFieldConf['field'] === fieldConf['field']) {
        this.filterConf.filters[index] = fieldConf;
        found = true;
      }
    });
    if (!found) {
      this.filterConf.filters.push(fieldConf);
    }
    this.filterConf.andOperator = andOperator;
    super.addFilter(fieldConf, andOperator, doEmit);
    return this;
  }


  getElements(): Promise<any> {
    const data = this.data.slice(0);
    return Promise.resolve(this.prepareData(data));
  }

  getSort(): any {
    return this.sortConf;
  }

  protected prepareData(data: Array<any>): Array<any> {
    data = this.sort(data);
    data = this.filter(data);
    return data;
  }

  protected sort(data: Array<any>): Array<any> {
    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        data = LocalSorter
          .sort(data, fieldConf['field'], fieldConf['direction'], fieldConf['compare']);
      });
    }
    return data;
  }

  protected filter(data: Array<any>): Array<any> {
    if (this.filterConf.filters) {
      if (this.filterConf.andOperator) {
        this.filterConf.filters.forEach((fieldConf) => {
          data = LocalFilter
            .filter(data, fieldConf['field'], fieldConf['search'], fieldConf['filter']);
        });
      } else {
        let mergedData = [];
        this.filterConf.filters.forEach((fieldConf) => {
          mergedData = mergedData.concat(LocalFilter
            .filter(data, fieldConf['field'], fieldConf['search'], fieldConf['filter']));
        });
        // remove non unique items
        data = mergedData.filter((elem, pos, arr) => {
          return arr.indexOf(elem) === pos;
        });
      }
    }

    return data;
  }


}
