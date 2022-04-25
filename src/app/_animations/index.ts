import {
  animate,
  animateChild,
  AnimationGroupMetadata,
  AnimationQueryMetadata,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const optional = { optional: true };

export const slider = trigger('routeAnimations', [
  transition('* => home', slideTo('left')),
  transition('details => *', slideTo('right')),
  transition('home => *', slideTo('right')),
]);

function slideTo(
  direction: string,
): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      { optional: true },
    ),
    query(':enter', [style({ [direction]: '-100%' })], { optional: true }),
    group([
      query(':leave', [animate('600ms ease', style({ [direction]: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))], {
        optional: true,
      }),
    ]),
  ];
}

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      optional,
    ),
    query(':enter', [style({ left: '-100%' })], optional),
    query(':leave', animateChild(), optional),
    group([
      query(
        ':leave',
        [animate('500ms ease-out', style({ left: '100%', opacity: 0 }))],
        optional,
      ),
      query(
        ':enter',
        [animate('500ms ease-out', style({ left: '0%', opacity: 1 }))],
        optional,
      ),
    ]),
    query(':enter', animateChild(), optional),
  ]),
]);
