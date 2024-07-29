import { Column, Row } from '@lightningtv/solid-ui';
import { For, createEffect, createSignal, untrack } from 'solid-js';
import Key from './Key';

const keyRows = [
  [
    { display: '!' },
    { display: '@' },
    { display: '#' },
    { display: '$' },
    { display: '%' },
    { display: '^' },
    { display: '&' },
    { display: '*' },
    { display: '(' },
    { display: ')' },
  ],
  [
    { display: '1' },
    { display: '2' },
    { display: '3' },
    { display: '4' },
    { display: '5' },
    { display: '6' },
    { display: '7' },
    { display: '8' },
    { display: '9' },
    { display: '0' },
  ],
  [
    { display: createSignal('a') },
    { display: createSignal('b') },
    { display: createSignal('c') },
    { display: createSignal('d') },
    { display: createSignal('e') },
    { display: createSignal('f') },
    { display: createSignal('g') },
    { display: createSignal('h') },
    { display: createSignal('i') },
    { display: createSignal('j') },
  ],
  [
    { display: createSignal('k') },
    { display: createSignal('l') },
    { display: createSignal('m') },
    { display: createSignal('n') },
    { display: createSignal('o') },
    { display: createSignal('p') },
    { display: createSignal('q') },
    { display: createSignal('r') },
    { display: createSignal('s') },
    { display: '@' },
  ],
  [
    { display: 'capsLockIcon', value: 'capsLock' },
    { display: createSignal('t') },
    { display: createSignal('u') },
    { display: createSignal('v') },
    { display: createSignal('w') },
    { display: createSignal('x') },
    { display: createSignal('y') },
    { display: createSignal('z') },
    { display: '.' },
    { display: 'backspaceIcon', value: 'backspace' },
  ],
  [
    { display: 'leftArrowIcon', width: 90, value: 'left' },
    { display: 'rightArrowIcon', width: 90, value: 'right' },
    { display: 'spacebarIcon', width: 192, value: ' ' },
    { display: '-' },
    { display: '_' },
    { display: 'OK', width: 124, value: 'okFunction' },
  ],
];

let upperCase = false;

/**
 * Iterates through the keyRows 2D array to toggle the display of type signal to the upper or lower case value
 */
const toggleKeyCase = () => {
  keyRows.forEach((keyRow) => {
    keyRow.forEach((key) => {
      // is a signal
      if (typeof key.display == 'object') {
        if (upperCase) {
          key.display[1]((prev) => prev?.toLowerCase());
        } else {
          key.display[1]((prev) => prev.toUpperCase());
        }
      }
    });
  });
};

/**
 * Method to get the display for a key which can either be an icon, a simple string or a signal
 * @param {string|signal} display is the content driving what should be displayed for a key
 * @returns {string} what to be displayed for the key
 */
const getKeyDisplay = (display) => {
  // is a signal
  if (typeof display == 'object') {
    return display[0](); // execute get method of signal
  } else {
    return display; // is a simple text item or icon
  }
};

const splitString = (string, position) => {
  const leftString = string.slice(0, position);
  const rightString = string.slice(position, string.length);
  return [leftString, rightString];
};

/**
 * Moves the provided cursor left in the text object provided
 * @param {number} currentCursorPosition is the current position of the cursor in the text parameter
 * @param {string} text is the string value in which the cursor must be moved
 * @returns new cursor position (moved one position to the left), reletive to the text
 */
const moveCursorLeft = (currentCursorPosition, text) => {
  if (currentCursorPosition == undefined) {
    // cursor has not been moved before, place it left of last character
    return text.length - 1;
  } else if (currentCursorPosition == 0) {
    // cannot move more to the left
    return 0;
  }
  return currentCursorPosition - 1; // move cursor to the left
};

/**
 * Moves the provided cursor left in the text object provided
 * @param {number} currentCursorPosition is the current position of the cursor in the text parameter
 * @param {string} text is the string value in which the cursor must be moved
 * @returns new cursor position (moved one position to the right), reletive to the text
 */
const moveCursorRight = (currentCursorPosition, text) => {
  if (currentCursorPosition == undefined) {
    // cursor has not been moved before
    return text.length;
  } else if (currentCursorPosition == text.length) {
    // no more caracters to the right
    return text.length;
  }
  return currentCursorPosition + 1; // move cursor to the right
};

/**
 * Method to remove a character from a string, provided it can do so
 * @param {string} text is the text from which the character must be removed
 * @param {number} cursorPosition is the position at which a character must be removed
 * @param {function} cursorUpdateFunction is the function called to update the cursor in the text once a character was removed
 * @returns the text string if no item could be removed (which is the case when the cursor is placed at its left most position)
 *          or returns the text object with the character at the cursor position
 */
const removeAtCursorPosition = (text, cursorPosition, cursorUpdateFunction) => {
  const [leftCursorString, rightCursorString] = splitString(
    text,
    cursorPosition,
  );
  if (leftCursorString) {
    // only perform delete if there is something to delete from left hand side of cursor
    cursorUpdateFunction((prev) => prev - 1);
    return leftCursorString.slice(0, -1) + rightCursorString;
  }
  return text;
};

/**
 * Method to add a character to a text string at the provided cursor position
 * @param {string} text is the string into which charToAdd needs to be added to
 * @param {string} charToAdd is the character that will be added to text
 * @param {number} cursorPosition is the position at which the character will be added
 * @param {function} cursorUpdateFunction is the function called to update the cursor in the text once the character was added
 * @returns the text string with the added character at the cursor position provided
 */
const addAtCursorPosition = (
  text,
  charToAdd,
  cursorPosition,
  cursorUpdateFunction,
) => {
  const [leftCursorString, rightCursorString] = splitString(
    text,
    cursorPosition,
  );
  cursorUpdateFunction((prev) => prev + 1);
  return leftCursorString + charToAdd + rightCursorString;
};

/**
 * A keyboard with basic keyboard functionality, allowing the capturing of keys interacted on. It supports to-upper-case and lowe-case, cursor moving (tbc by design team and still to be implemented), backspace functionality and toggling between characters and symbole (tbc by design teamt and still to be implemented)
 * @param {object} props allowing custom options to be defined for the keyboard
 * - props.text - is the text field that will be appeneded to and passwed to the okFunction
 * - props.okFunction - a function to run when the 'OK' key is entered on. The function expects 1 parameter which is the final text resulting from keyboard interactions
 * - props.setText - a signal setter function that runs when keys are interacted with, updating the text property
 * - props.setCursorFunction - function that executes when cahracters are entered on, incrementing the cursor position and decrements the cursor position when a character is backspaced
 * - props.cursorPosition - is the position of the cursor, used when adding a new character to the text or when backspaced at a specific location in the text
 * @returns
 */
const Keyboard = (props) => {
  // options: {equals: false} to always trigger effect, comparison to prev value will
  // always evaluate to false
  const [getKeyPressedSignal, setKeyPressedSignal] = createSignal(undefined, {
    equals: false,
  });

  const cursorPlaced = () => {
    return props.cursorPosition != undefined && props.cursorPosition >= 0;
  };

  createEffect(() => {
    const keyPressed = getKeyPressedSignal();
    if (keyPressed) {
      switch (keyPressed) {
        case 'capsLock':
          toggleKeyCase();
          upperCase = !upperCase;
          break;
        case 'backspace':
          // need to untrack as the cursor position is a signal and we need to update the cursor signal as well. Without untrack recussion error occurs
          untrack(() => {
            props.setText((prev) => {
              if (cursorPlaced()) {
                return removeAtCursorPosition(
                  prev,
                  props.cursorPosition,
                  props.setCursorFunction,
                );
              }
              return props.setText((prev) => prev.slice(0, -1)); // remove from end of text
            });
          });

          break;
        case 'okFunction':
          props.okFunction(props.text);
          break;
        case 'left':
          props.setCursorFunction((prev) => moveCursorLeft(prev, props.text));
          break;
        case 'right':
          props.setCursorFunction((prev) => moveCursorRight(prev, props.text));
          break;
        default:
          // need to untrack as the cursor position is a signal and we need to update the cursor signal as well. Without untrack recussion error occurs
          untrack(() => {
            props.setText((prev) => {
              let prevString = prev == undefined ? '' : prev;
              if (cursorPlaced()) {
                return addAtCursorPosition(
                  prev,
                  keyPressed,
                  props.cursorPosition,
                  props.setCursorFunction,
                );
              }
              return prevString + keyPressed; // add to end of text
            });
          });
          break;
      }
    }
  });

  return (
    <Column
      {...props}
      width={668}
      height={444}
      gap={12}
      plinko={true}
      scroll='none'
      wrap
    >
      <For each={keyRows}>
        {(keysRow) => {
          return (
            <Row height={64} gap={12} wrap>
              <For each={keysRow}>
                {(key) => {
                  return (
                    <Key
                      {...key}
                      onEnter={() => {
                        setKeyPressedSignal(
                          key.value ||
                            getKeyDisplay(key.display) ||
                            'undefined',
                        );
                      }}
                      display={getKeyDisplay(key.display)}
                    />
                  );
                }}
              </For>
            </Row>
          );
        }}
      </For>
    </Column>
  );
};

export default Keyboard;
