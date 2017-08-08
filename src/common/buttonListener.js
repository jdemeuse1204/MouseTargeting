let listenOnceKeyPressRegistered = false;
let listenOnceKeyUpRegistered = false;
let listenKeyPressRegistered = false;
let listenKeyUpRegistered = false;

export default class ButtonListener {
  // keycode map - https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
  selector = '';
  listenOnceFunctions = {};
  listenFunctions = {};

  constructor(selector) {
    this.selector = selector;

    for (let prop in buttonsByWhich) {
      this.listenOnceFunctions[prop] = {
        downFn: undefined,
        upFn: undefined,
        state: buttonState.up
      };
      this.listenFunctions[prop] = {
        downFn: undefined,
        upFn: undefined,
        state: buttonState.up
      };
    }
  }

  listenOnceOrderedQueue(buttons, buttonDownCallback, buttonUpCallback, missedButtonCallback) {
    const that = this;
    const buttonsList = buttons;

    for (let i = 0; i < buttons.length; i++) {
      this.listenOnceFunctions[buttons[i]].downFn = buttonDownCallback;
      this.listenOnceFunctions[buttons[i]].upFn = buttonUpCallback;
    }

    if (listenOnceKeyPressRegistered === false) {
      document.getElementById('body').addEventListener('keydown', e => {
        e.preventDefault();
        e.stopPropagation();

        // so the function doesnt keep getting called on hold
        if (that.listenOnceFunctions[e.which].state === buttonState.down) {
          return;
        }

        if (buttonsList[0] !== e.which) {
          missedButtonCallback(e.which);
          return;
        }

        const fn = that.listenOnceFunctions[e.which].downFn;

        // mark button state as down
        that.listenOnceFunctions[e.which].state = buttonState.down;
        if (fn) {
          buttonsList.shift();
          fn(buttonsList[0], buttonsList.length);
        }
      });
      listenOnceKeyPressRegistered = true;
    }

    if (listenOnceKeyUpRegistered === false) {
      document.getElementById('body').addEventListener('keyup', e => {
        e.preventDefault();
        e.stopPropagation();

        // so the function doesnt keep getting called on hold
        if (that.listenOnceFunctions[e.which].state === buttonState.up) {
          return;
        }

        const fn = that.listenOnceFunctions[e.which].upFn;

        // mark button state as down
        that.listenOnceFunctions[e.which].state = buttonState.up;
        if (fn) {
          fn();
        }
      });
      listenOnceKeyUpRegistered = true;
    }
  }

  listenOnce(button, buttonDownCallback, buttonUpCallback, missedButtonCallback) {
    const that = this;
    this.listenOnceFunctions[button].downFn = buttonDownCallback;
    this.listenOnceFunctions[button].upFn = buttonUpCallback;

    if (listenOnceKeyPressRegistered === false) {
      document.getElementById('body').addEventListener('keydown', e => {
        e.preventDefault();
        e.stopPropagation();

        // so the function doesnt keep getting called on hold
        if (that.listenOnceFunctions[e.which].state === buttonState.down) {
          return;
        }

        const fn = that.listenOnceFunctions[e.which].downFn;

        // mark button state as down
        that.listenOnceFunctions[e.which].state = buttonState.down;
        if (fn) {
          fn();
          that.listenOnceFunctions[e.which].downFn = undefined;
        } else {
          missedButtonCallback();
        }
      });
      listenOnceKeyPressRegistered = true;
    }

    if (listenOnceKeyUpRegistered === false) {
      document.getElementById('body').addEventListener('keyup', e => {
        e.preventDefault();
        e.stopPropagation();

        // so the function doesnt keep getting called on hold
        if (that.listenOnceFunctions[e.which].state === buttonState.up) {
          return;
        }

        const fn = that.listenOnceFunctions[e.which].upFn;

        // mark button state as down
        that.listenOnceFunctions[e.which].state = buttonState.up;
        if (fn) {
          fn();
          that.listenOnceFunctions[e.which].upFn = undefined;
        }
      });
      listenOnceKeyUpRegistered = true;
    }
  }

  listen(button, buttonDownCallback, buttonUpCallback) {
    const that = this;
    this.listenFunctions[button].downFn = buttonDownCallback;
    this.listenFunctions[button].upFn = buttonUpCallback;

    if (listenKeyPressRegistered === false) {
      document.getElementById('body').addEventListener('keydown', e => {
        e.preventDefault();
        e.stopPropagation();

        // so the function doesnt keep getting called on hold
        if (that.listenFunctions[e.which].state === buttonState.down) {
          return;
        }

        const fn = that.listenFunctions[e.which].downFn;
        that.listenFunctions[e.which].state = buttonState.down;
        if (fn) {
          fn();
        }
      });
      listenKeyPressRegistered = true;
    }

    if (listenKeyUpRegistered === false) {
      document.getElementById('body').addEventListener('keyup', e => {
        e.preventDefault(); // prevent weird webpage interactions
        e.stopPropagation();

        // so the function doesnt keep getting called on hold
        if (that.listenFunctions[e.which].state === buttonState.up) {
          return;
        }

        const fn = that.listenFunctions[e.which].upFn;
        that.listenFunctions[e.which].state = buttonState.up;
        if (fn) {
          fn();
        }
      });
      listenKeyUpRegistered = true;
    }
  }
}

export const buttons = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pauseBreak': 19,
  'capslock': 20,
  'escape': 27,
  'spacebar': 32,
  'pageup': 33,
  'pagedown': 34,
  'end': 35,
  'home': 36,
  'leftarrow': 37,
  'uparrow': 38,
  'rightarrow': 39,
  'downarrow': 40,
  'insert': 45,
  'delete': 46,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  'leftwindowkey': 91,
  'rightwindowkey': 92,
  'selectkey': 93,
  'numpad0': 96,
  'numpad1': 97,
  'numpad2': 98,
  'numpad3': 99,
  'numpad4': 100,
  'numpad5': 101,
  'numpad6': 102,
  'numpad7': 103,
  'numpad8': 104,
  'numpad9': 105,
  'multiply': 106,
  'add': 107,
  'subtract': 109,
  'decimalpoint': 110,
  'divide': 111,
  'f1': 112,
  'f2': 113,
  'f3': 114,
  'f4': 115,
  'f5': 116,
  'f6': 117,
  'f7': 118,
  'f8': 119,
  'f9': 120,
  'f10': 121,
  'f11': 122,
  'f12': 123,
  'numlock': 144,
  'scrolllock': 145,
  'semicolon': 186,
  'equalsign': 187,
  'comma': 188,
  'dash': 189,
  'period': 190,
  'forwardslash': 191,
  'graveaccent': 192,
  'openbracket': 219,
  'backslash': 220,
  'closebraket': 221,
  'singlequote': 222
};

export const buttonsByWhich = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pauseBreak',
  20: 'capslock',
  27: 'escape',
  32: 'spacebar',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'leftarrow',
  38: 'uparrow',
  39: 'rightarrow',
  40: 'downarrow',
  45: 'insert',
  46: 'delete',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'leftwindowkey',
  92: 'rightwindowkey',
  93: 'selectkey',
  96: 'numpad0',
  97: 'numpad1',
  98: 'numpad2',
  99: 'numpad3',
  100: 'numpad4',
  101: 'numpad5',
  102: 'numpad6',
  103: 'numpad7',
  104: 'numpad8',
  105: 'numpad9',
  106: 'multiply',
  107: 'add',
  109: 'subtract',
  110: 'decimalpoint',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  144: 'numlock',
  145: 'scrolllock',
  186: 'semicolon',
  187: 'equalsign',
  188: 'comma',
  189: 'dash',
  190: 'period',
  191: 'forwardslash',
  192: 'graveaccent',
  219: 'openbracket',
  220: 'backslash',
  221: 'closebraket',
  222: 'singlequote'
};

export const buttonState = {
  down: 'down',
  up: 'up'
};
