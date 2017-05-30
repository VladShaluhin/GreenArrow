import { Component, Directive, OnInit } from '@angular/core';


@Directive({
  selector: 'ga-card-title'
})
export class GaCardTitle{}

@Directive({
  selector: 'ga-card-body'
})
export class GaCardBody {}

@Directive({
  selector: '[ga-remove-button], [gaRemoveButton]',
})
export class GaRemoveButton {}



@Component({
  selector: 'ga-card',
  templateUrl: './card.html',
  styleUrls: ['./card.component.scss']
})
export class GaCard implements OnInit {
  isExpanded: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}


@Component({
  selector: 'ga-card-header',
  templateUrl: './card-header.html',
})
export class GaCardHeader  {}
