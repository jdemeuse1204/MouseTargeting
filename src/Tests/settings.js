import { buttons } from '../common/buttonListener';

// 16 buttons
export let buttonMap = {
  forward: buttons.w,
  backward: buttons.s,
  left: buttons.a,
  right: buttons.d,
  peekLeft: buttons.q,
  peekRight: buttons.e,
  jump: buttons.spacebar,
  crouch: buttons.c,
  prone: buttons.z,
  reload: buttons.r,
  weapon1: buttons['1'],
  weapon2: buttons['2'],
  weapon3: buttons['3'],
  weapon4: buttons['4'],
  weapon5: buttons['5'],
  steadyScope: buttons.shift
};

export let buttonMapReverseNumbers = {
  1: 'forward',
  2: 'backward',
  3: 'left',
  4: 'right',
  5: 'peekLeft',
  6: 'peekRight',
  7: 'jump',
  8: 'crouch',
  9: 'prone',
  10: 'reload',
  11: 'weapon1',
  12: 'weapon2',
  13: 'weapon3',
  14: 'weapon4',
  15: 'weapon5',
  16: 'steadyScope'
};
