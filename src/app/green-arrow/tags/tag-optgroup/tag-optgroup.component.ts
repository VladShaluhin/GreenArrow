import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ga-tag-optgroup',
  templateUrl: './tag-optgroup.component.html',
  styleUrls: ['./tag-optgroup.component.scss']
})
export class GaTagOptgroupComponent implements OnInit {
  @Input() type: string = '';
  classes: string[] = [];
  ngOnInit() {
    this.classes = [`tags--${this.type}`];
  }
}
