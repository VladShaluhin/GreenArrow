import { Subject, Observable } from 'rxjs';

const PENDING = 'PENDING';
const READY = 'READY';
export const STATUSES = { PENDING, READY};

export abstract class DataSource {
  protected onChangedSource: Subject<any> = new Subject();
  protected onUpdatedSource = new Subject<any>();
  protected onAddedSource = new Subject<any>();
  protected onUpdateStartSource = new Subject<any>();
  protected onUpdateErrorSource = new Subject<any>();

  abstract getElements(): Promise<any>;
  abstract getSort(): any;

  constructor() {

  }

  refresh(): void {
    this.emitOnChanged('refresh');
  }

  load(data: any): Promise<any> {
    this.emitOnChanged('load');
    return Promise.resolve();
  }

  onChanged(): Observable<any> {
    return this.onChangedSource.asObservable();
  }

  onUpdated(): Observable<any> {
    return this.onUpdatedSource.asObservable();
  }

  onUpdateStart(): Observable<any> {
    return this.onUpdateStartSource.asObservable();
  }

  onUpdateError(): Observable<any> {
    return this.onUpdateErrorSource.asObservable();
  }

  update(element: any, valueAsync: Promise<any>): Promise<any> {
    this.emitOnUpdateStart(element);
    return valueAsync
      .then(() => this.emitOnUpdated(element))
      .then(() => {
        this.emitOnChanged('update');
      })
      .catch((errors) => {
        this.emitOnUpdatedError(element, errors);
      })
  }

  append(element: any): Promise<any> {
    this.emitOnChanged('append');
    this.emitOnAdded(element);
    return Promise.resolve(element);
  }

  remove(element: any): Promise<any> {
    this.emitOnChanged('remove');
    return Promise.resolve();
  }

  setSort(conf: Array<any>, doEmit?: boolean): void {
    if (doEmit) {
      this.emitOnChanged('sort');
    }
  }

  addFilter(fieldConf: {}, andOperator?: boolean, doEmit?: boolean): void {
    if (doEmit) {
      this.emitOnChanged('filter');
    }
  }

  protected emitOnAdded(element: any): void {
    this.onAddedSource.next(element);
  }

  protected emitOnUpdated(element: any): void {
    this.onUpdatedSource.next(element);
  }

  protected emitOnUpdateStart(element: any): void {
    this.onUpdateStartSource.next(element);
  }

  protected emitOnUpdatedError(element: any, errors): void {
    this.onUpdateErrorSource.next({element, errors});
  }


  protected emitOnChanged (action: string): void {
    this.getElements()
      .then((elements) => this.onChangedSource.next({
        action: action,
        elements: elements,
      }));
  }
}
