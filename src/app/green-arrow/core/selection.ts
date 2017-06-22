import { Subject } from 'rxjs';
export  class SelectionModel<T> {
  private _selection: Set<T> = new Set();

  private _deselectedToEmit: T[] = [];

  private _selectedToEmit: T[] = [];

  private _selected: T[];

  /** Selected value(s). */
  get selected(): T[] {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }

    return this._selected;
  }

  onChange: Subject<SelectionChange<T>> =  new Subject();

  constructor(
    private _isMulti = false,
    initiallySelectedValues?: T[],
  ) {
    if (initiallySelectedValues) {
      if (_isMulti) {
        initiallySelectedValues.forEach(value => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }
    }
    this._selectedToEmit.length = 0;
  }

  isSelected(value: T): boolean {
    return this._selection.has(value);
  }

  isEmpty(): boolean {
    return this._selection.size === 0;
  }

  select(value: T): void {
    this._markSelected(value);
    this._emitChangeEvent();
  }

  deselect(value: T): void {
    this._unmarkSelected(value);
    this._emitChangeEvent();
  }

  toggle(value: T): void {
    this.isSelected(value) ? this.deselect(value) : this.select(value);
  }

  clear(): void {
    this._unmarkAll();
    this._emitChangeEvent();
  }

  private _emitChangeEvent() {
    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      let eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);

      this.onChange.next(eventData);
      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }

    this._selected = null;
  }

  private _markSelected(value: T) {
    if (!this.isSelected(value)) {
      if (!this._isMulti) {
        this._unmarkAll();
      }

      this._selection.add(value);

      this._selectedToEmit.push(value);
    }
  }

  private _unmarkAll() {
    if (!this.isEmpty()) {
      this._selection.forEach(value => this._unmarkSelected(value));
    }
  }

  /** Deselects a value. */
  private _unmarkSelected(value: T) {
    if (this.isSelected(value)) {
      this._selection.delete(value);

      this._deselectedToEmit.push(value);
    }
  }
}

export class SelectionChange<T> {
  constructor(public added?: T[], public removed?: T[]) { }
}
