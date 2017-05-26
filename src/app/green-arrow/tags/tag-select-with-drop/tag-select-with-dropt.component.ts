import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Self, ViewChild } from '@angular/core';
import { GaTagSelectDirective } from '../tag-select.directive';
import { transformDrop } from './drop-animation'
import { ScrollDispatcher, ConnectedOverlayDirective } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ga-tag-select-with-drop',
  templateUrl: './tag-select-with-drop.component.html',
  styleUrls: ['./tag-select-with-drop.component.scss'],
  animations: [
    transformDrop
  ]
})
export class GaTagSelectWithDropComponent implements OnInit {
  private _scrollSubscription: Subscription;
  @Input() panelOpen: boolean =  false;

  _positions = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  _offsetY = 0;
  _triggerWidth = 0;

  get selection(): any[] {
    return this._tagSelect ? this._tagSelect.selected : [];
  }

  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild(ConnectedOverlayDirective) overlayDir: ConnectedOverlayDirective;

  constructor(
    private _element: ElementRef,
    @Self() private _tagSelect: GaTagSelectDirective,
    private _scrollDispatcher: ScrollDispatcher,
  ) { }

  ngOnInit() {
    this._offsetY = this._getTriggerRect().height;

    this._tagSelect.change
      .do(_ => this._focusHost())
      .subscribe(_ => {
        this.close();
      })
  }

  onToggle({target}) {
    if (!target.closest('ga-tag-option') ) {
      this.toggle();
    }
  }

  _onAttached() {
    if (!this._scrollSubscription) {
      this._scrollSubscription = this._scrollDispatcher.scrolled(null, () => {
        const overlayRef = this.overlayDir.overlayRef;
        overlayRef.updatePosition();
      });
    }
  }

  _onDetach() {
    this._scrollSubscription.unsubscribe();
    this._scrollSubscription = null;
  }

  toggle() {
    this.panelOpen ? this.close() : this.open();
  }

  open() {
    if (!this._triggerWidth) {
      this._setTriggerWidth();
    }
    this.panelOpen = true;
  }

  close() {
    this.panelOpen = false;
  }

  private _focusHost(): void {
    this._element.nativeElement.focus();
  }

  private _setTriggerWidth(): void {
    this._triggerWidth = this._getTriggerRect().width;
  }

  private _getTriggerRect(): ClientRect {
    return this.trigger.nativeElement.getBoundingClientRect();
  }

}


@Component({
  selector: 'ga-tag-dropdown',
  template: `
    <ng-template
      cdk-connected-overlay
      [origin]="origin"
      [open]="dropdownOpen"
      [positions]="_positions"
      hasBackdrop
      (backdropClick)="backdropClick.emit($event)"
      [offsetY]="_offsetY"
      [minWidth]="_triggerWidth"
      (attach)="_onAttached()"
      (detach)="_onDetach()"
      backdropClass="cdk-overlay-transparent-backdrop">
      <div class="tags__drop" [@transformDrop]="'showing'">
        <div class="tags__wrapper">
          <ga-tag-option ngFor="let opt of optionsAsync | async"></ga-tag-option>
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `
})
export class GaTagDropdownComponent {
  private _scrollSubscription: Subscription;

  @Input() dropdownOpen: boolean =  false;
  @Input() origin: any;
  @ViewChild(ConnectedOverlayDirective) overlayDir: ConnectedOverlayDirective;

  @Output() backdropClick = new EventEmitter();

  _positions = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];
  _offsetY = 0;
  _triggerWidth = 0;

  constructor(
    private _scrollDispatcher: ScrollDispatcher,
  ) {}

  _onAttached() {
    if (!this._scrollSubscription) {
      this._scrollSubscription = this._scrollDispatcher.scrolled(null, () => {
        const overlayRef = this.overlayDir.overlayRef;
        overlayRef.updatePosition();
      });
    }
  }

  _onDetach() {
    this._scrollSubscription.unsubscribe();
    this._scrollSubscription = null;
  }

}
