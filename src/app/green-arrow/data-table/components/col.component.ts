import { Component, Input, TemplateRef, ContentChild, ViewChild, ChangeDetectionStrategy} from '@angular/core';


@Component({
  selector: 'ga-table-col',
  template: `
    <ng-content></ng-content>
  `
})
export class ColComponent {
  private _sortDirection: string = '';
  @Input() id: any;
  @Input() title: string;
  @Input() sort: boolean = true;
  @Input()
  get sortDirection() {
    return this._sortDirection;
  }
  set sortDirection(val: string) {
    this._sortDirection = val.toUpperCase();
  }
  @Input() compareFunction: Function;
  @Input() validateFunction: Function;


  @ContentChild('default') defaultTemplate: TemplateRef<any>;
  @ContentChild('invalid') invalidTemplate: TemplateRef<any>;
  @ContentChild('editing') editingTemplate: TemplateRef<any>;
}
