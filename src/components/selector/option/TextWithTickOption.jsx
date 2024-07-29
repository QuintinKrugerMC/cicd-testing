import styles from '../../../styles';
import Option from './Option';
import { View, Text } from '@lightningtv/solid';
import { createSignal, createEffect } from 'solid-js';

const BorderStyleSelector = {
  borderRadius: 16,
  border: {
    width: 4,
    color: '#0095DA26',
  },
  focus: {
    colorLeft: '#00508F',
    colorRight: '#0095DA',
    border: {
      width: 0,
    },
  },
  selected: {
    border: {
      width: 4,
      color: '#0095DA',
    },
  },
};

const ItemTitleStyle = {
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 44,
  contain: 'width',
  focus: {
    fontSize: 28,
  },
};
const ItemSubtextStyle = {
  fontSize: 24,
  fontWeight: 500,
  lineHeight: 36,
  contain: 'width',
};

const ImageStyle = {
  width: 44,
  height: 44,
  focus: {
    src: 'assets/icons/white_checkmark.png',
  },

  src: 'assets/icons/green_checkmark.png',
};

const TextWithTickOption = (props) => {
  const [getSelectedStateSignal, setSelectedStateSignal] = createSignal(false);
  let option;

  createEffect(() => {
    if (getSelectedStateSignal()) {
      option.states.add('selected');
    } else {
      option.states.remove('selected');
    }
  });
  return (
    <Option
      height={178}
      width={586}
      {...props}
      justifyContent={'spaceBetween'}
      value={props.value}
      setSelectedOption={props.setSelectedOption}
      style={BorderStyleSelector}
      ref={option}
    >
      <View style={styles.ColumnContainerStyle} width={462} marginLeft={28}>
        <Text style={ItemTitleStyle}>{props.title}</Text>
        <Text style={ItemSubtextStyle}>{props.subtext}</Text>
      </View>
      <Show
        when={props.showTick}
        fallback={() => {
          setSelectedStateSignal(false);
          return <View width={44} height={44}></View>;
        }}
      >
        {() => {
          setSelectedStateSignal(true);
        }}
        <View style={ImageStyle} marginRight={28} />
      </Show>
    </Option>
  );
};

export default TextWithTickOption;
