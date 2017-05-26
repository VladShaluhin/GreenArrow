import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const transformDrop: AnimationTriggerMetadata = trigger('transformDrop', [
  state('showing', style({
    opacity: 1,
    transform: `scaleY(1)`
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: `scaleY(0)`
    }),
    animate(`200ms cubic-bezier(0.25, 0.8, 0.25, 1)`)
  ]),
  transition('* => void', [
    animate('50ms 100ms linear', style({opacity: 0}))
  ])
]);
