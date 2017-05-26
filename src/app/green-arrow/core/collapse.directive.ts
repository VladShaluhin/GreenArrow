import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[gaCollapse]',
  host: {
    '[style.display]':  '_display'
  }
})
export class GaCollapseDirective {
  private _isExpanded: boolean = false;

  _display: string;

  @Input()
  private set gaCollapse(value:boolean) {
    this._isExpanded = value;
    this.toggle();
  }

  private get gaCollapse():boolean {
    return this._isExpanded;
  }

  constructor() { }

  toggle(): void {
    if (this._isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  public hide(): void {
    this._isExpanded = false;
    this._display = 'none';
  }

  public  show(): void {
    this._isExpanded = true;
    this._display = 'block';
  }
}
