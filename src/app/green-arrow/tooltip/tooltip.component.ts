import { Component, Input } from '@angular/core';

@Component({
  selector: 'ga-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class GaTooltipComponent {
  @Input() icon: string = '';
}
