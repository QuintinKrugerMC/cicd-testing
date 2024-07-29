import { View, hexColor, Text } from '@lightningtv/solid';

const SymbolStyle = {
  fontSize: 32,
  weight: 500,
  lineHeight: 48,
  textAlign: 'center',
  mount: 0.5,
};

const KeyContainerStyle = {
  colorLeft: '#0095DA26',
  colorRight: '#0095DA26',
  borderRadius: 8,
  focus: {
    colorLeft: '#00508FD9',
    colorRight: '#0095DA',
  },
};

const icons = {
  backspaceIcon: {
    src: '/assets/icons/backspace-icon.png',
    width: 34,
    height: 34,
  },
  spacebarIcon: {
    src: '/assets/icons/space-bar-icon.png',
    width: 34,
    height: 34,
  },
  capsLockIcon: {
    src: '/assets/icons/caps-lock-icon.png',
    width: 34,
    height: 34,
  },
  leftArrowIcon: {
    src: '/assets/icons/left-arrow-icon.png',
    width: 34,
    height: 34,
  },
  rightArrowIcon: {
    src: '/assets/icons/right-arrow-icon.png',
    width: 34,
    height: 34,
  },
};

const Key = (props) => {
  const keyWidth = props.width ? props.width : 56;
  const keyHeight = props.height ? props.height : 64;
  return (
    <View
      {...props}
      width={keyWidth}
      height={keyHeight}
      style={KeyContainerStyle}
    >
      <Show
        when={
          typeof props.display == 'string' && props.display.includes('Icon')
        }
        fallback={
          <Text style={SymbolStyle} x={keyWidth / 2} y={keyHeight / 2}>
            {props.display}
          </Text>
        }
      >
        <View
          {...icons[`${props.display}`]}
          x={keyWidth / 2}
          y={keyHeight / 2}
          mount={0.5}
        />
      </Show>
    </View>
  );
};

export default Key;
