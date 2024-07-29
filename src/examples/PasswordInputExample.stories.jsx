import PasswordInput from '../components/inputs/PasswordInput';
import { createSignal } from 'solid-js';
import { View, Text } from '@lightningtv/solid';
import styles from '../styles';
import { Column } from '@lightningtv/solid-ui';

const InstructionContainer = {
  colorLeft: '#0095DA26',
  colorRight: '#0095DA26',
  borderRadius: 16,
  focus: {
    colorLeft: '#00508F',
    colorRight: '#0095DA',
  },
};
export const PasswordInputExample = () => {
  const [getPasswordSignal, setPasswordSignal] = createSignal('');
  const [getCursorPositionSignal, setCursorPositionSignal] = createSignal();
  return (
    <Column
      src={'/assets/background.png'}
      style={styles.CenteredColumnContainerStyle}
      autofocus
    >
      <PasswordInput
        password={getPasswordSignal()}
        width={400}
        cursorPosition={getCursorPositionSignal()}
      />
      <View
        style={[InstructionContainer, styles.CenteredColumnContainerStyle]}
        height={150}
        width={550}
        onEnter={() => {
          setPasswordSignal((prev) => prev + 'abc');
        }}
        onBackspace={() => {
          setPasswordSignal((prev) => prev.replace('abc', ''));
        }}
        onLeft={() =>
          setCursorPositionSignal((prev) => {
            if (prev == undefined) {
              // cursor has not been moved before, place it left of last character
              return getPasswordSignal().length - 1;
            }
            if (prev == 0) {
              // cannot move more to the left
              return 0;
            }
            return prev - 1; // move cursor to the left
          })
        }
        onRight={() =>
          setCursorPositionSignal((prev) => {
            if (prev == undefined) {
              // cursor has not been moved before
              return getPasswordSignal().length;
            } else if (prev == getPasswordSignal().length) {
              // no more caracters to the right
              return getPasswordSignal().length;
            }
            return prev + 1; // move cursor to the right
          })
        }
      >
        <Text fontSize={25}>Hit enter to add 'abc' to text field</Text>
        <Text fontSize={25}>Hit bacspace to remove 'abc' to text field</Text>
        <Text fontSize={25}>Hit left or right keys to move cursor</Text>
      </View>
    </Column>
  );
};

export default {
  title: 'PasswordInput',
  component: PasswordInputExample,
};
