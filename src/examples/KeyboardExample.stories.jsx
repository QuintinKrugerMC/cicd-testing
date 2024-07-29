import { createSignal } from 'solid-js';
import Keyboard from '../components/keyboard/Keyboard';
import { Text, View } from '@lightningtv/solid';

const KeyboardExample = () => {
  const [text, setText] = createSignal();
  return (
    <View src={'/assets/background.png'}>
      <Text fontSize={45}>
        {text() == undefined
          ? 'Enter keys in keyboard to see them change here'
          : text()}
      </Text>
      <Keyboard
        autofocus
        y={80}
        text={text()}
        setText={setText}
        okFunction={(finalText) => {
          console.log(`Final text is ${finalText}`);
        }}
        leftFunction={() => console.log('left arrow key pressed')}
        rightFunction={() => console.log('right arrow key pressed')}
      />
    </View>
  );
};

export default {
  title: 'Keyboard',
  component: KeyboardExample,
};
export const Default = () => <KeyboardExample />;
