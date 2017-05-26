import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ga-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class GaCardComponent implements OnInit {
  isExpanded: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
